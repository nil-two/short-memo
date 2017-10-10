const Clutter   = imports.gi.Clutter;
const Lang      = imports.lang;
const Main      = imports.ui.main;
const Mainloop  = imports.mainloop;
const PanelMenu = imports.ui.panelMenu;
const St        = imports.gi.St;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

const MESSAGE_KEY = 'message';

const ShortMemo = new Lang.Class({
    Name: 'ShortMemo',
    Extends: PanelMenu.Button,

    _init: function() {
        this.parent(St.Align.START);
        this._settings = Convenience.getSettings();
        this._settingsChangedSignal = this._settings.connect(
                'changed',
                Lang.bind(this, function() {
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
            name: "short-memo-message",
            y_align: Clutter.ActorAlign.CENTER,
            y_expand: true,
        });
        this.actor.add_actor(this._message);

        let menuBox = new St.BoxLayout({
            vertical: true,
        });
        this.menu.box.add(menuBox);

        this._newMessage = new St.Entry({
            name: "short-memo-new-message",
            track_hover: true,
            can_focus: true,
        });
        this._newMessage.clutter_text.connect(
                'key-press-event',
                Lang.bind(this, function(_, e) {
                    if (e.get_key_symbol() == 65293) {
                        let newText = this._newMessage.get_text();
                        this._saveMessage(newText);
                        this._refreshUI();
                    }
                }));
        menuBox.add_actor(this._newMessage);

        this.menu.connect(
                'open-state-changed',
                Lang.bind(this, function(sender, isOpenSignal) {
                    if (isOpenSignal) {
                        Mainloop.timeout_add(20, Lang.bind(this, function() {
                            this._newMessage.grab_key_focus();
                        }));
                    }
                }));
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

let shortMemo;

function init() {
}

function enable() {
    shortMemo = new ShortMemo();
    Main.panel.addToStatusArea('shortMemo', shortMemo);
}

function disable() {
    if (shortMemo != null)
        shortMemo.destroy();
}
