// ore_processing_system.js
// APEX Ore Processing — T2 (Create Crushing 2x) + T5 (PNC Pressure Chamber x16)
// Nutzt KubeJS High-Level Create API (vermeidet 1.21.1 Recipe-JSON Format-Probleme).

ServerEvents.recipes(event => {

    // === TIER 2: Create Crushing — deterministisch 2x ===
    const crushedOres = [
        ['minecraft:iron_ore', 'create:crushed_raw_iron'],
        ['minecraft:gold_ore', 'create:crushed_raw_gold'],
        ['minecraft:copper_ore', 'create:crushed_raw_copper'],
        ['mekanism:osmium_ore', 'gaia:crushed_osmium']
    ]

    crushedOres.forEach(([ore, crushed]) => {
        event.recipes.create.crushing(`2x ${crushed}`, ore)
    })

    // === TIER 5: PneumaticCraft x16 Multiplier ===
    // 8x Dust + 4x Plastic + 1x Brine → 16x Pellets
    //
    // TODO: PneumaticCraft Pressure Chamber Recipe-Format in KubeJS 2101.x ist unklar.
    //       Aktuelles event.custom-Format führt zu Parse-Errors. Vorerst auskommentiert.
    //       Alternative-Implementierung: Custom KubeJS Block-Event oder Datapack-JSON.
    /*
    const apexMetals = [
        ['mekanism:dust_iron', 'gaia:refined_iron_pellet', 'minecraft:iron_ingot'],
        ['mekanism:dust_gold', 'gaia:refined_gold_pellet', 'minecraft:gold_ingot'],
        ['mekanism:dust_osmium', 'gaia:refined_osmium_pellet', 'mekanism:ingot_osmium']
    ]
    apexMetals.forEach(([dust, pellet, ingot]) => {
        // PNC Pressure Chamber Recipe — Format zu verifizieren
        event.smelting(ingot, pellet).xp(0.1)
    })
    */
})
