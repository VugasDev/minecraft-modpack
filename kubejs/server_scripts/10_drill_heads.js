// 10_drill_heads.js — Ore Excavation Drill Head Upgrade-Pfad
//
// Upgrade-Pfad (Progression):
//   Vanilla / Andesite Drill Head  — Basis (Create: Ore Excavation Standard)
//   Iron Drill Head                — Standard (Create: Ore Excavation Standard)
//   gaia:osmium_drill_head         — T3: +1% Resource Catalyst Drop, +50% Osmium Output
//   gaia:refined_obsidian_drill_head — T4: +3% Catalyst Drop, +Metall-Bonus auf alle Erze
//   gaia:gaia_infused_drill_head   — T5: Garantierter Catalyst bei Erzadern, Singularity Shard Chance
//
// Spezial-Heads:
//   gaia:crystal_drill_head        — +100% Certus Quartz / Fluix / Amethyst bei Schichten < 0
//   gaia:nether_drill_head         — +100% Nether Quartz / Blaze Powder / Nether Gold im Nether
//
// TECHNISCHE ANMERKUNG:
// Create: Ore Excavation exponiert den aktiven Drill-Head-Typ nicht direkt an den
// Loot-Context. Der Bonus wird daher über ein Drillhead-NBT-Tag am Contraption-Block
// ausgelesen, oder (einfacher): über ein "gehaltenes Item"-System, bei dem der Spieler
// den Drill Head als eine Art Token im Offhand hat, den die Contraption einliest.
//
// Für T1-Alpha reicht die Basis-Implementierung (Drop-Bonus statisch via Loot-Chance).
// Vollständige Drill-Head-NBT-Integration kommt in einem späteren Update.

ServerEvents.recipes(event => {

    // ==========================================================================
    // DRILL HEAD REZEPTE
    // ==========================================================================

    // Osmium Drill Head — T3
    // Benötigt: Osmium Ingots + Iron Drill Head (falls Create:OE das als Item hat) + Andesite Casing
    event.shaped('gaia:osmium_drill_head', [
        'OOO',
        'OIO',
        'OAO'
    ], {
        O: 'mekanism:ingot_osmium',
        I: 'create:crushed_raw_iron',   // Standard-Drill-Material als Basis
        A: 'create:andesite_casing'
    })

    // Refined Obsidian Drill Head — T4
    // Benötigt: Refined Obsidian + Precision Mechanism + Brass Casing
    event.shaped('gaia:refined_obsidian_drill_head', [
        'RRR',
        'RPR',
        'RBR'
    ], {
        R: 'mekanism:ingot_refined_obsidian',
        P: 'create:precision_mechanism',
        B: 'create:brass_casing'
    })

    // Gaia-Infused Drill Head — T5
    // Benötigt: Refined Obsidian Head + Gaia Core Item + Atomic Alloy + Singularity Shard
    event.shapeless('gaia:gaia_infused_drill_head', [
        'gaia:refined_obsidian_drill_head',
        'gaia:gaia_core',
        'mekanism:alloy_atomic',
        'gaia:singularity_shard'
    ])

    // Crystal Drill Head — T3 Spezialisierung
    // Benötigt: Certus Quartz + Amethyst + Osmium Casing
    event.shaped('gaia:crystal_drill_head', [
        'CAC',
        'COC',
        'CAC'
    ], {
        C: 'ae2:certus_quartz_crystal',
        A: 'minecraft:amethyst_shard',
        O: 'mekanism:ingot_osmium'
    })

    // Nether Drill Head — T3 Spezialisierung
    // Benötigt: Nether Quartz + Blaze Rod + Magma Block
    event.shaped('gaia:nether_drill_head', [
        'QBQ',
        'BNB',
        'QBQ'
    ], {
        Q: 'minecraft:nether_quartz',
        B: 'minecraft:blaze_rod',
        N: 'minecraft:magma_block'
    })

    // ==========================================================================
    // SCHMELZREZEPTE für Veredelte Pellets (aus ore_processing_system.js)
    // ==========================================================================
    // Pellets durch PNC Pressure Chamber produziert, schmelzbar zu 1.5x Barren
    // Direkt hier definiert damit klar ist was schmelzbar ist.
    event.smelting('minecraft:iron_ingot', 'gaia:refined_iron_pellet').xp(0.2)
    event.smelting('minecraft:gold_ingot', 'gaia:refined_gold_pellet').xp(0.2)
    event.smelting('mekanism:ingot_osmium', 'gaia:refined_osmium_pellet').xp(0.3)

    event.blasting('minecraft:iron_ingot', 'gaia:refined_iron_pellet').xp(0.1)
    event.blasting('minecraft:gold_ingot', 'gaia:refined_gold_pellet').xp(0.1)
    event.blasting('mekanism:ingot_osmium', 'gaia:refined_osmium_pellet').xp(0.15)
})

// ==========================================================================
// DRILL HEAD BONUS-DROPS (via LootJS — Ore Excavation Context)
// ==========================================================================
// Hinweis: LootJS-Integration für Drill-Head-spezifische Drops.
// Der Drill Head wird als Tagged-Item im Hotbar-Slot 8 (letzter Slot) erwartet,
// was der Spieler als Konvention benutzt wenn er Ore Excavation-Drills betreibt.
//
// Alternative: Custom Event, der von einem Create: OE Addon gefeuert wird.
// TODO: Prüfen ob Create: Ore Excavation 1.21.1 einen Custom Loot-Event hat.

LootJS.modifiers(event => {

    // Osmium Drill Head: +50% Osmium-Drop beim Osmium-Erz-Abbau
    // (Bonus tritt nur auf wenn Spieler osmium_drill_head in Offhand hält)
    event.addBlockLootModifier('mekanism:osmium_ore', '#mekanism:ores/osmium')
        .matchTool(ItemFilter.hasNBT({ DrillHead: 'gaia:osmium_drill_head' }).or(
            ItemFilter.OFFHAND.items.some(i => i.id === 'gaia:osmium_drill_head')
        ))
        .addLoot(LootEntry.of('mekanism:raw_osmium').withCount(1, 2))

    // Refined Obsidian Drill Head: +1 Raw-Ores auf alle Metallerzabbau
    event.addBlockLootModifier('#forge:ores')
        .matchTool(ItemFilter.OFFHAND.items.some(i =>
            i.id === 'gaia:refined_obsidian_drill_head' || i.id === 'gaia:gaia_infused_drill_head'
        ))
        .addLoot(LootEntry.of('gaia:resource_catalyst').withCount(1).withChance(0.03))

    // Gaia-Infused Drill Head: Garantierter Catalyst Drop bei Erzadern + Shard Chance
    event.addBlockLootModifier('#forge:ores')
        .matchTool(ItemFilter.OFFHAND.items.some(i => i.id === 'gaia:gaia_infused_drill_head'))
        .addLoot(LootEntry.of('gaia:resource_catalyst').withCount(1))
        .addLoot(LootEntry.of('gaia:singularity_shard').withCount(1).withChance(0.01))

    // Crystal Drill Head: +100% Certus Quartz und Amethyst im Stein
    event.addBlockLootModifier('ae2:certus_quartz_ore', 'ae2:deepslate_certus_quartz_ore')
        .matchTool(ItemFilter.OFFHAND.items.some(i => i.id === 'gaia:crystal_drill_head'))
        .addLoot(LootEntry.of('ae2:certus_quartz_crystal').withCount(1, 3))

    event.addBlockLootModifier('minecraft:amethyst_cluster')
        .matchTool(ItemFilter.OFFHAND.items.some(i => i.id === 'gaia:crystal_drill_head'))
        .addLoot(LootEntry.of('minecraft:amethyst_shard').withCount(2, 4))

    // Nether Drill Head: +100% Nether Quartz und Gold im Nether
    event.addBlockLootModifier('minecraft:nether_quartz_ore')
        .matchTool(ItemFilter.OFFHAND.items.some(i => i.id === 'gaia:nether_drill_head'))
        .addLoot(LootEntry.of('minecraft:nether_quartz').withCount(2, 4))

    event.addBlockLootModifier('minecraft:nether_gold_ore')
        .matchTool(ItemFilter.OFFHAND.items.some(i => i.id === 'gaia:nether_drill_head'))
        .addLoot(LootEntry.of('minecraft:gold_nugget').withCount(4, 8))
})
