// 10_drill_heads.js — Create: Ore Excavation Custom Veins & Drill Head Upgrade-Pfad
//
// Drill-Head-Progression:
//   Standard (COE built-in)          — Andesite / Iron / Steel / Diamond
//   T3  gaia:osmium_drill_head       — Osmium-Ader, +Catalyst-Chance, +Osmium-Bonus
//   T3  gaia:crystal_drill_head      — Certus/Amethyst-Ader, +Kristall-Bonus
//   T3  gaia:nether_drill_head       — Nether-Ader (nur Nether), +Quartz/Gold-Bonus
//   T4  gaia:refined_obsidian_drill_head — Metall-Ader mit x3 Output + Catalyst
//   T5  gaia:gaia_infused_drill_head — Mythische Ader, garantierter Catalyst + Shard-Chance
//
// Entity-Textur: assets/gaia/textures/entity/drill/<name>.png
// Item-Tag:      #createoreexcavation:drills (via tags/11_drill_tags.js)

ServerEvents.recipes(event => {

    // =========================================================================
    // GAIA CUSTOM VEINS
    // =========================================================================
    // Jede Gaia-Ader ist eine eigenständige Weltgenerierungs-Ader.
    // Placement-Parameter: (spacing, separation, salt)
    //   spacing     = minimaler Abstand zwischen Adern in Chunks
    //   separation  = maximale Ausdehnung (muss < spacing sein)
    //   salt        = Zufallsseed (einzigartig pro Ader, sonst Überlappung)

    // ─── Osmium-Ader (T3) ─────────────────────────────────────────────────────
    // Osmium-Erz, mitteldichte Adern, Overworld unter Y=16
    event.recipes.createoreexcavation.vein(
        '{"text": "Osmium Deposit", "color": "blue"}',
        'mekanism:osmium_ore'
    )
        .placement(512, 64, 91823741)
        .veinSize(1.5, 3.0)
        .biomeWhitelist('forge:is_overworld')
        .id('gaia:osmium_vein')

    // Standard-Abbau mit beliebigem Drill (reduzierter Output)
    event.recipes.createoreexcavation.drilling(
        Item.of('mekanism:raw_osmium', 2),
        'gaia:osmium_vein', 200
    ).id('gaia:osmium_any_drill')

    // Osmium Drill Head: doppelter Output + 1% Resource Catalyst
    event.recipes.createoreexcavation.drilling(
        [
            Item.of('mekanism:raw_osmium', 4),
            coeutil.processingOutput('gaia:resource_catalyst', 0.01)
        ],
        'gaia:osmium_vein', 150
    ).drill('gaia:osmium_drill_head').priority(1).id('gaia:osmium_osmium_head')

    // Refined Obsidian Head: 3x Output + 3% Catalyst
    event.recipes.createoreexcavation.drilling(
        [
            Item.of('mekanism:raw_osmium', 6),
            coeutil.processingOutput('gaia:resource_catalyst', 0.03)
        ],
        'gaia:osmium_vein', 120
    ).drill('gaia:refined_obsidian_drill_head').priority(2).id('gaia:osmium_robs_head')

    // Gaia-Infused Head: 4x Output + garantierter Catalyst + 1% Shard
    event.recipes.createoreexcavation.drilling(
        [
            Item.of('mekanism:raw_osmium', 8),
            Item.of('gaia:resource_catalyst'),
            coeutil.processingOutput('gaia:singularity_shard', 0.01)
        ],
        'gaia:osmium_vein', 100
    ).drill('gaia:gaia_infused_drill_head').priority(3).id('gaia:osmium_gaia_head')

    // ─── Certus-/Kristall-Ader (T3, Crystal Head) ─────────────────────────────
    // Certus Quartz Ore als Kern; tief unter Y=0
    event.recipes.createoreexcavation.vein(
        '{"text": "Crystal Vein", "color": "aqua"}',
        'ae2:certus_quartz_ore'
    )
        .placement(768, 96, 37492015)
        .veinSize(1.0, 2.5)
        .biomeWhitelist('forge:is_overworld')
        .id('gaia:certus_vein')

    // Standard: 1 Kristall
    event.recipes.createoreexcavation.drilling(
        Item.of('ae2:certus_quartz_crystal', 1),
        'gaia:certus_vein', 250
    ).id('gaia:certus_any_drill')

    // Crystal Drill Head: 4 Certus + Fluix-Chance
    event.recipes.createoreexcavation.drilling(
        [
            Item.of('ae2:certus_quartz_crystal', 4),
            coeutil.processingOutput('ae2:fluix_crystal', 0.25)
        ],
        'gaia:certus_vein', 180
    ).drill('gaia:crystal_drill_head').priority(1).id('gaia:certus_crystal_head')

    // Gaia-Infused Head: 6 Certus + 50% Fluix + 1% Catalyst
    event.recipes.createoreexcavation.drilling(
        [
            Item.of('ae2:certus_quartz_crystal', 6),
            coeutil.processingOutput('ae2:fluix_crystal', 0.5),
            coeutil.processingOutput('gaia:resource_catalyst', 0.01)
        ],
        'gaia:certus_vein', 140
    ).drill('gaia:gaia_infused_drill_head').priority(2).id('gaia:certus_gaia_head')

    // ─── Nether-Ressourcen-Ader (T3, Nether Head) ─────────────────────────────
    // Nether Quartz als Ader-Block; ausschließlich im Nether
    event.recipes.createoreexcavation.vein(
        '{"text": "Nether Vein", "color": "red"}',
        'minecraft:nether_quartz_ore'
    )
        .placement(512, 64, 65829374)
        .veinSize(2.0, 4.0)
        .biomeBlacklist('forge:is_overworld')
        .id('gaia:nether_vein')

    // Standard: 2 Nether Quartz
    event.recipes.createoreexcavation.drilling(
        Item.of('minecraft:nether_quartz', 2),
        'gaia:nether_vein', 200
    ).id('gaia:nether_any_drill')

    // Nether Drill Head: 6 Quartz + Nether Gold Nugget + Blaze Powder-Chance
    event.recipes.createoreexcavation.drilling(
        [
            Item.of('minecraft:nether_quartz', 6),
            Item.of('minecraft:gold_nugget', 4),
            coeutil.processingOutput('minecraft:blaze_powder', 0.3)
        ],
        'gaia:nether_vein', 150
    ).drill('gaia:nether_drill_head').priority(1).id('gaia:nether_nether_head')

    // Gaia-Infused Head: 8 Quartz + Nether Gold Ingot + Blaze Rod + 1% Catalyst
    event.recipes.createoreexcavation.drilling(
        [
            Item.of('minecraft:nether_quartz', 8),
            Item.of('minecraft:gold_ingot', 2),
            coeutil.processingOutput('minecraft:blaze_rod', 0.5),
            coeutil.processingOutput('gaia:resource_catalyst', 0.02)
        ],
        'gaia:nether_vein', 120
    ).drill('gaia:gaia_infused_drill_head').priority(2).id('gaia:nether_gaia_head')

    // ─── Veredeltes-Erz-Ader (T4, Refined Obsidian Head) ─────────────────────
    // Deep Slate Iron als Matrix; seltene, tiefe Adern (Y < -40)
    event.recipes.createoreexcavation.vein(
        '{"text": "Rich Metal Vein", "color": "gray"}',
        'minecraft:deepslate_iron_ore'
    )
        .placement(1024, 128, 44918273)
        .veinSize(2.0, 5.0)
        .biomeWhitelist('forge:is_overworld')
        .id('gaia:rich_metal_vein')

    // Standard: 3 Raw Iron
    event.recipes.createoreexcavation.drilling(
        Item.of('minecraft:raw_iron', 3),
        'gaia:rich_metal_vein', 300
    ).id('gaia:rich_metal_any_drill')

    // Osmium Head: 5 Raw Iron + 1 Raw Osmium
    event.recipes.createoreexcavation.drilling(
        [
            Item.of('minecraft:raw_iron', 5),
            Item.of('mekanism:raw_osmium', 1)
        ],
        'gaia:rich_metal_vein', 250
    ).drill('gaia:osmium_drill_head').priority(1).id('gaia:rich_metal_osmium_head')

    // Refined Obsidian Head: 8 Raw Iron + 2 Raw Osmium + 3% Catalyst
    event.recipes.createoreexcavation.drilling(
        [
            Item.of('minecraft:raw_iron', 8),
            Item.of('mekanism:raw_osmium', 2),
            coeutil.processingOutput('gaia:resource_catalyst', 0.03)
        ],
        'gaia:rich_metal_vein', 200
    ).drill('gaia:refined_obsidian_drill_head').priority(2).id('gaia:rich_metal_robs_head')

    // Gaia-Infused Head: 12 Raw Iron + 4 Raw Osmium + garantierter Catalyst + 2% Shard
    event.recipes.createoreexcavation.drilling(
        [
            Item.of('minecraft:raw_iron', 12),
            Item.of('mekanism:raw_osmium', 4),
            Item.of('gaia:resource_catalyst'),
            coeutil.processingOutput('gaia:singularity_shard', 0.02)
        ],
        'gaia:rich_metal_vein', 160
    ).drill('gaia:gaia_infused_drill_head').priority(3).id('gaia:rich_metal_gaia_head')

    // ─── Mythische Ader (T5, ausschließlich Gaia-Infused Head) ───────────────
    // Ancient Debris als Ader-Block — ultra-selten, immer finite, tief unter Y=-48
    // Nur mit Gaia-Infused Drill Head abbaubar. Kein Standard-Output.
    event.recipes.createoreexcavation.vein(
        '{"text": "Mythic Vein", "color": "light_purple"}',
        'minecraft:ancient_debris'
    )
        .placement(2048, 256, 19384756)
        .veinSize(0.5, 1.5)
        .alwaysFinite()
        .biomeBlacklist('forge:is_overworld')   // nur Nether (Ancient Debris spawnt dort)
        .id('gaia:mythic_vein')

    // Kein Standard-Output: andere Drills produzieren nichts nützliches
    event.recipes.createoreexcavation.drilling(
        Item.of('minecraft:netherrack', 1),
        'gaia:mythic_vein', 600
    ).id('gaia:mythic_any_drill')

    // Gaia-Infused Head: 2 Mythic Catalyst + 10% Singularity Shard + Ancient Debris
    event.recipes.createoreexcavation.drilling(
        [
            Item.of('gaia:mythic_catalyst', 2),
            Item.of('minecraft:ancient_debris', 1),
            coeutil.processingOutput('gaia:singularity_shard', 0.1)
        ],
        'gaia:mythic_vein', 400
    ).drill('gaia:gaia_infused_drill_head').priority(1).id('gaia:mythic_gaia_head')

    // =========================================================================
    // DRILL HEAD HANDWERK-REZEPTE
    // =========================================================================

    // Osmium Drill Head — T3 (benötigt: Osmium + Andesite Casing + Crushed Osmium)
    event.shaped('gaia:osmium_drill_head', [
        'OOO',
        'OCO',
        'OAO'
    ], {
        O: 'mekanism:ingot_osmium',
        C: 'gaia:crushed_osmium',
        A: 'create:andesite_casing'
    })

    // Crystal Drill Head — T3 Spezial (Certus + Amethyst + Osmium als Kern)
    event.shaped('gaia:crystal_drill_head', [
        'CAC',
        'AOA',
        'CAC'
    ], {
        C: 'ae2:certus_quartz_crystal',
        A: 'minecraft:amethyst_shard',
        O: 'mekanism:ingot_osmium'
    })

    // Nether Drill Head — T3 Spezial (Nether Quartz + Blaze + Magma)
    event.shaped('gaia:nether_drill_head', [
        'QBQ',
        'BNB',
        'QBQ'
    ], {
        Q: 'minecraft:nether_quartz',
        B: 'minecraft:blaze_rod',
        N: 'minecraft:magma_block'
    })

    // Refined Obsidian Drill Head — T4
    event.shaped('gaia:refined_obsidian_drill_head', [
        'ROR',
        'OPO',
        'RBR'
    ], {
        R: 'mekanism:ingot_refined_obsidian',
        O: 'mekanism:ingot_osmium',
        P: 'create:precision_mechanism',
        B: 'create:brass_casing'
    })

    // Gaia-Infused Drill Head — T5 (Upgrade vom Refined Obsidian Head)
    event.shapeless('gaia:gaia_infused_drill_head', [
        'gaia:refined_obsidian_drill_head',
        'mekanism:alloy_atomic',
        'gaia:singularity_shard',
        'gaia:mythic_catalyst'
    ])

    // =========================================================================
    // SCHMELZREZEPTE — Veredelte Pellets (aus PNC Pressure Chamber)
    // =========================================================================
    event.smelting('minecraft:iron_ingot', 'gaia:refined_iron_pellet').xp(0.2)
    event.smelting('minecraft:gold_ingot', 'gaia:refined_gold_pellet').xp(0.2)
    event.smelting('mekanism:ingot_osmium', 'gaia:refined_osmium_pellet').xp(0.3)
    event.blasting('minecraft:iron_ingot', 'gaia:refined_iron_pellet').xp(0.1)
    event.blasting('minecraft:gold_ingot', 'gaia:refined_gold_pellet').xp(0.1)
    event.blasting('mekanism:ingot_osmium', 'gaia:refined_osmium_pellet').xp(0.15)
})

// =========================================================================
// ITEM-TAG: Custom Drills zur COE-Drill-Liste hinzufügen
// =========================================================================
ServerEvents.tags('item', event => {
    event.add('createoreexcavation:drills', [
        'gaia:osmium_drill_head',
        'gaia:crystal_drill_head',
        'gaia:nether_drill_head',
        'gaia:refined_obsidian_drill_head',
        'gaia:gaia_infused_drill_head'
    ])
})
