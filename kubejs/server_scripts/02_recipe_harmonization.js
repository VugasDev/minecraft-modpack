// 02_recipe_harmonization.js
// Erweitertes Balancing & Mod-Integration
ServerEvents.recipes(event => {

    // --- 1. Energie-Brücke: Create Tier 2 Gate für Electric Motor ---
    // Osmium-Gate entfernt: Der Motor ist die Create↔FE Brücke und muss vor Mekanism erreichbar sein
    event.remove({id: 'createaddition:electric_motor'})
    event.shaped('createaddition:electric_motor', [
        ' A ',
        'BCB',
        ' A '
    ], {
        A: 'create:shaft',
        B: 'create:precision_mechanism',
        C: 'create:electron_tube'
    })

    // --- 2. APEX Ore Processing: Create Crushed Ore → Mekanism Dust ---
    // Mekanism 1.21.1 hat keine lead/tin Dusts — entfernt
    // Nutzt KubeJS High-Level Mekanism API (vermeidet Recipe-JSON Format-Probleme)
    const crushedOres = ['iron', 'gold', 'copper', 'osmium']
    crushedOres.forEach(metal => {
        event.recipes.mekanism.enriching(
            `2x mekanism:dust_${metal}`,
            `create:crushed_raw_${metal}`
        )
    })

    // --- 3. Pneumaticraft Druckluft-Gate ---
    // Kompressor benötigt nun Create-Bauteile für den Aufbau
    event.remove({id: 'pneumaticcraft:air_compressor'})
    event.shaped('pneumaticcraft:air_compressor', [
        'ABA',
        'CDC',
        'ABA'
    ], {
        A: 'minecraft:iron_ingot',
        B: 'create:andesite_casing',
        C: 'minecraft:piston',
        D: 'minecraft:furnace'
    })
})
