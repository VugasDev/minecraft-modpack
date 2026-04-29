// 03_ui_cleanup.js
// Benötigt: KubeJS REI Integration Addon (https://modrinth.com/mod/kubejs-rei) — zur Mod-Liste hinzufügen
// REIEvents existiert nicht nativ in KubeJS 6 — korrekter Event: ClientEvents.hideJEIOrREI
ClientEvents.hideJEIOrREI(event => {
    event.hide('create:copper_ingot')
    event.hide('mekanism:ingot_copper')
})
