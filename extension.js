const St = imports.gi.St;
const Gio = imports.gi.Gio;
const Main = imports.ui.main;
const Lang = imports.lang;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const ExtensionUtils = imports.misc.extensionUtils;

const MESSAGE_KEY = 'message';

let shortMemo;

function getSettings() {
    let extension = ExtensionUtils.getCurrentExtension();
    let schema = extension.metadata['settings-schema'];

    let schemaDir = extension.dir.get_child('schemas');
    let schemaSource = Gio.SettingsSchemaSource.new_from_directory(
            schemaDir.get_path(),
            Gio.SettingsSchemaSource.get_default(),
            false);

    let schemaObj = schemaSource.lookup(schema, true);
    if (!schemaObj) {
        throw new Error(
                'Schema ' + schema + ' could not be found for extension ' +
                extension.metadata.uuid);
    }
    return new Gio.Settings({ settings_schema: schemaObj });
}

function ShortMemo() {
    this._init();
}

ShortMemo.prototype = {
    __proto__: PanelMenu.Button.prototype,

    _init: function() {
        PanelMenu.Button.prototype._init.call(this, St.Align.START);
        this._settings = getSettings();
        this._buildUI();
        this._refresh();
    },

    _buildUI: function() {
        this.message = new St.Label({
        });
        this.actor.add_actor(this.message);

        if (this.mainBox != null)
            this.mainBox.destroy();
        this.mainBox = new St.BoxLayout();
        this.mainBox.set_vertical(true);

        let hint = new St.Label({
            name: "hint",
            text:_("New message:"),
        });
        this.mainBox.add_actor(hint);

        this.newMessage = new St.Entry({
            name: "newMessage",
            track_hover: true,
            can_focus: true,
        });
        this.newMessage.clutter_text.connect(
                'key-press-event',
                Lang.bind(this, function(o, e) {
                    if (e.get_key_symbol() == 65293) {
                        let newText = this.newMessage.get_text();
                        this._save(newText)
                        this._refresh()
                    }
                }));
        this.mainBox.add_actor(this.newMessage);

        this.menu.box.add(this.mainBox);
    },

    _refresh: function() {
        let text = this._load();
        this.message.set_text(text);
        this.newMessage.set_text(text);
        this.menu.close();
    },

    _save: function(text) {
        this._settings.set_string(MESSAGE_KEY, text);
    },

    _load: function() {
        return this._settings.get_string(MESSAGE_KEY);
    },
};

function init() {
}

function enable() {
    shortMemo = new ShortMemo();
    Main.panel.addToStatusArea('shortmemo', shortMemo);
}

function disable() {
    shortMemo.destroy();
    shortMemo = null;
}
