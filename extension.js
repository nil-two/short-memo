const St = imports.gi.St;
const Main = imports.ui.main;
const Lang = imports.lang;
const PanelMenu = imports.ui.panelMenu;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

const MESSAGE_KEY = 'message';

const ShortMemo = new Lang.Class({
    Name: 'ShortMemo',
    Extends: PanelMenu.Button,

    _init: function() {
        PanelMenu.Button.prototype._init.call(this, St.Align.START);
        this._settings = Convenience.getSettings();
        this._settingsChangedSignal = this._settings.connect(
                'changed',
                Lang.bind(this, function(rettings, keys) {
                    this._refreshUI();
                }));
        this._buildUI();
        this._refreshUI();
    },

    _onDestroy: function() {
        this._settings.disconnect(this._settingsChangedSignal);
        this.parent();
    },

    _buildUI: function() {
        this._message = new St.Label({
        });
        this.actor.add_actor(this._message);

        if (this._menuBox != null)
            this._menuBox.destroy();
        this._menuBox = new St.BoxLayout();
        this._menuBox.set_vertical(true);

        let hint = new St.Label({
            name: "short-memo-hint",
            text:_("New message:"),
        });
        this._menuBox.add_actor(hint);

        this._newMessage = new St.Entry({
            name: "short-memo-new-message",
            track_hover: true,
            can_focus: true,
        });
        this._newMessage.clutter_text.connect(
                'key-press-event',
                Lang.bind(this, function(o, e) {
                    if (e.get_key_symbol() == 65293) {
                        let newText = this._newMessage.get_text();
                        this._saveMessage(newText);
                        this._refreshUI();
                    }
                }));
        this._menuBox.add_actor(this._newMessage);

        this.menu.box.add(this._menuBox);
    },

    _refreshUI: function() {
        let message = this._loadMessage();
        this._message.set_text(message);
        this._newMessage.set_text(message);
        this.menu.close();
    },

    _saveMessage: function(message) {
        this._settings.set_string(MESSAGE_KEY, message);
    },

    _loadMessage: function() {
        return this._settings.get_string(MESSAGE_KEY);
    },

    setMessage: function(message) {
        this._saveMessage(message);
        this._refreshUI();
    }
});

function init() {
}

function enable() {
    let shortMemo = new ShortMemo();
    Main.panel.addToStatusArea('shortMemo', shortMemo);
}

function disable() {
    if (Main.panel.statusArea.shortMemo != null)
        Main.panel.statusArea.shortMemo.destroy();
}
