// src/kubejs/server_scripts/ore_processing_system.js
ServerEvents.recipes(event => {
    // 1. TIER 2: Create Crushing (deterministisch 2x)
    const crushedOres = [
        ['minecraft:iron_ore', 'create:crushed_raw_iron'],
        ['minecraft:gold_ore', 'create:crushed_raw_gold'],
        ['minecraft:copper_ore', 'create:crushed_raw_copper'],
        ['mekanism:osmium_ore', 'apex:crushed_osmium']
    ]

    crushedOres.forEach(([ore, crushed]) => {
        event.custom({
            type: 'create:crushing',
            ingredients: [{ item: ore }],
            results: [{ item: crushed, count: 2 }],
            processingTime: 200
        })
    })

    // 2. TIER 5: PneumaticCraft x16 Multiplier
    // 8x Dust + 4x Plastic + 1x Brine → 16x Pellets
    const apexMetals = [
        ['mekanism:dust_iron', 'apex:refined_iron_pellet', 'minecraft:iron_ingot'],
        ['mekanism:dust_gold', 'apex:refined_gold_pellet', 'minecraft:gold_ingot'],
        ['mekanism:dust_osmium', 'apex:refined_osmium_pellet', 'mekanism:ingot_osmium']
    ]

    apexMetals.forEach(([dust, pellet, ingot]) => {
        event.custom({
            type: 'pneumaticcraft:pressure_chamber',
            inputs: [
                { item: dust, count: 8 },
                { item: 'pneumaticcraft:plastic', count: 4 },
                { fluid: 'mekanism:brine', amount: 1000 }
            ],
            results: [
                { item: pellet, count: 16 }
            ],
            pressure: 4.0
        })
        
        // Smelting
        event.smelting(ingot, pellet).xp(0.1)
    })
})
