const St = imports.gi.St;
const GLib = imports.gi.GLib;
const Main = imports.ui.main;
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const Clutter = imports.gi.Clutter;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

let shortMemo;

function ShortMemo() {
    this._init();
}

ShortMemo.prototype = {
    __proto__: PanelMenu.Button.prototype,

    _init: function() {
        PanelMenu.Button.prototype._init.call(this, St.Align.START);
        this.filePath = GLib.get_home_dir() + "/.shortmemo";

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
        GLib.file_set_contents(this.filePath, text);
    },

    _load: function() {
        if (!GLib.file_test(this.filePath, GLib.FileTest.EXISTS))
            GLib.file_set_contents(this.filePath, 'empty');
        return Shell.get_file_contents_utf8_sync(this.filePath);
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
