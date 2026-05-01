// 01_resource_unification.js
// Harmonisierung der Tags für Interoperabilität (NeoForge 1.21.1: neoforge: statt forge:)
ServerEvents.tags('item', event => {
    // Standardmetalle: Wildcard erfasst alle Mods mit [metal]_ingot-Konvention
    // tin/lead/uranium entfernt — kein Mod im Pack liefert diese Metalle
    const standardMetals = ['iron', 'gold', 'copper']
    standardMetals.forEach(metal => {
        event.add(`neoforge:ingots/${metal}`, new RegExp(`.*:${metal}_ingot`))
        event.add(`neoforge:dusts/${metal}`, new RegExp(`.*:${metal}_dust`))
    })

    // Mekanism nutzt umgekehrte Konvention: ingot_metal statt metal_ingot
    event.add('neoforge:ingots/osmium', 'mekanism:ingot_osmium')
    event.add('neoforge:dusts/osmium', 'mekanism:dust_osmium')
})
