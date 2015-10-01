const Gio = imports.gi.Gio;
const ExtensionUtils = imports.misc.extensionUtils;

const MESSAGE_KEY = 'message';

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
                Extension.metadata.uuid);
    }
    return new Gio.Settings({
        settings_schema: schemaObj,
    });
}
