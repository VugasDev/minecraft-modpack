// 10_drill_heads.js — Create: Ore Excavation Custom Veins & Drill Head Upgrade-Pfad
//
// Drill-Head-Progression:
//   Standard (COE built-in)              — Andesite / Iron / Steel / Diamond
//   T3  gaia:osmium_drill_head           — Osmium-Ader, +Catalyst-Chance, +Osmium-Bonus
//   T3  gaia:crystal_drill_head          — Certus/Amethyst-Ader, +Kristall-Bonus
//   T3  gaia:nether_drill_head           — Nether-Ader (nur Nether), +Quartz/Gold-Bonus
//   T4  gaia:refined_obsidian_drill_head — Metall-Ader mit x3 Output + Catalyst
//   T4  gaia:catalyst_drill_head         — Catalyst Node (finite) + Ley Line (infinite)
//   T5  gaia:gaia_infused_drill_head     — Mythische Ader, garantierter Catalyst + Shard-Chance
//
// Catalyst-System:
//   gaia:catalyst_node (alwaysFinite)  — Jeder Drill: kleine Catalyst-Menge; erschöpft sich
//   gaia:catalyst_ley_line (alwaysInfinite) — Nur catalyst_drill_head nützlich; andere → Schotter
//   catalyst_drill_head auf beiden: hoher Yield + kleine Mythic Catalyst Chance
//
// Alle Gaia-Adern sind alwaysFinite — verhindert endloses Farmen einer einzelnen Ader.
//
// Entity-Textur: assets/gaia/textures/entity/drill/<name>.png
// Item-Tag:      #createoreexcavation:drills (am Ende dieser Datei)

// =========================================================================
// HANDWERK-REZEPTE — eigener Block damit COE-Fehler diese nicht killen
// =========================================================================
ServerEvents.recipes(event => {

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

    // Catalyst Drill Head — T4 (Spezialist, Gate: 4× Resource Catalyst + Refined Obsidian)
    event.shaped('gaia:catalyst_drill_head', [
        'CRC',
        'RPR',
        'CRC'
    ], {
        C: 'gaia:resource_catalyst',
        R: 'mekanism:ingot_refined_obsidian',
        P: 'create:precision_mechanism'
    })

    // Gaia-Infused Drill Head — T5 (Upgrade vom Refined Obsidian Head)
    event.shapeless('gaia:gaia_infused_drill_head', [
        'gaia:refined_obsidian_drill_head',
        'mekanism:alloy_atomic',
        'gaia:singularity_shard',
        'gaia:mythic_catalyst'
    ])

    // Schmelzrezepte — Veredelte Pellets (aus PNC Pressure Chamber)
    event.smelting('minecraft:iron_ingot', 'gaia:refined_iron_pellet').xp(0.2)
    event.smelting('minecraft:gold_ingot', 'gaia:refined_gold_pellet').xp(0.2)
    event.smelting('mekanism:ingot_osmium', 'gaia:refined_osmium_pellet').xp(0.3)
    event.blasting('minecraft:iron_ingot', 'gaia:refined_iron_pellet').xp(0.1)
    event.blasting('minecraft:gold_ingot', 'gaia:refined_gold_pellet').xp(0.1)
    event.blasting('mekanism:ingot_osmium', 'gaia:refined_osmium_pellet').xp(0.15)
})

// =========================================================================
// COE VEINS & DRILLING — eigener Block; Fehler hier killen nicht die Crafting-Rezepte
// =========================================================================
ServerEvents.recipes(event => {

    // ─── Osmium-Ader (T3) ─────────────────────────────────────────────────────
    event.recipes.createoreexcavation.vein(
        { text: 'Osmium Deposit', color: 'blue' },
        'mekanism:osmium_ore'
    )
        .placement(512, 64, 91823741)
        .veinSize(1, 3)
        .alwaysFinite()
        .biomeWhitelist('forge:is_overworld')
        .id('gaia:osmium_vein')

    event.recipes.createoreexcavation.drilling(
        Item.of('mekanism:raw_osmium', 2),
        'gaia:osmium_vein', 200
    ).id('gaia:osmium_any_drill')

    event.recipes.createoreexcavation.drilling(
        [
            Item.of('mekanism:raw_osmium', 4),
            coeutil.processingOutput('gaia:resource_catalyst', 0.01)
        ],
        'gaia:osmium_vein', 150
    ).drill('gaia:osmium_drill_head').priority(1).id('gaia:osmium_osmium_head')

    event.recipes.createoreexcavation.drilling(
        [
            Item.of('mekanism:raw_osmium', 6),
            coeutil.processingOutput('gaia:resource_catalyst', 0.03)
        ],
        'gaia:osmium_vein', 120
    ).drill('gaia:refined_obsidian_drill_head').priority(2).id('gaia:osmium_robs_head')

    event.recipes.createoreexcavation.drilling(
        [
            Item.of('mekanism:raw_osmium', 8),
            Item.of('gaia:resource_catalyst'),
            coeutil.processingOutput('gaia:singularity_shard', 0.01)
        ],
        'gaia:osmium_vein', 100
    ).drill('gaia:gaia_infused_drill_head').priority(3).id('gaia:osmium_gaia_head')

    // ─── Certus-/Kristall-Ader (T3, Crystal Head) ─────────────────────────────
    event.recipes.createoreexcavation.vein(
        { text: 'Crystal Vein', color: 'aqua' },
        'ae2:certus_quartz_ore'
    )
        .placement(768, 96, 37492015)
        .veinSize(1, 2)
        .alwaysFinite()
        .biomeWhitelist('forge:is_overworld')
        .id('gaia:certus_vein')

    event.recipes.createoreexcavation.drilling(
        Item.of('ae2:certus_quartz_crystal', 1),
        'gaia:certus_vein', 250
    ).id('gaia:certus_any_drill')

    event.recipes.createoreexcavation.drilling(
        [
            Item.of('ae2:certus_quartz_crystal', 4),
            coeutil.processingOutput('ae2:fluix_crystal', 0.25)
        ],
        'gaia:certus_vein', 180
    ).drill('gaia:crystal_drill_head').priority(1).id('gaia:certus_crystal_head')

    event.recipes.createoreexcavation.drilling(
        [
            Item.of('ae2:certus_quartz_crystal', 6),
            coeutil.processingOutput('ae2:fluix_crystal', 0.5),
            coeutil.processingOutput('gaia:resource_catalyst', 0.01)
        ],
        'gaia:certus_vein', 140
    ).drill('gaia:gaia_infused_drill_head').priority(2).id('gaia:certus_gaia_head')

    // ─── Nether-Ressourcen-Ader (T3, Nether Head) ─────────────────────────────
    event.recipes.createoreexcavation.vein(
        { text: 'Nether Vein', color: 'red' },
        'minecraft:nether_quartz_ore'
    )
        .placement(512, 64, 65829374)
        .veinSize(2, 4)
        .alwaysFinite()
        .biomeBlacklist('forge:is_overworld')
        .id('gaia:nether_vein')

    event.recipes.createoreexcavation.drilling(
        Item.of('minecraft:nether_quartz', 2),
        'gaia:nether_vein', 200
    ).id('gaia:nether_any_drill')

    event.recipes.createoreexcavation.drilling(
        [
            Item.of('minecraft:nether_quartz', 6),
            Item.of('minecraft:gold_nugget', 4),
            coeutil.processingOutput('minecraft:blaze_powder', 0.3)
        ],
        'gaia:nether_vein', 150
    ).drill('gaia:nether_drill_head').priority(1).id('gaia:nether_nether_head')

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
    event.recipes.createoreexcavation.vein(
        { text: 'Rich Metal Vein', color: 'gray' },
        'minecraft:deepslate_iron_ore'
    )
        .placement(1024, 128, 44918273)
        .veinSize(2, 5)
        .alwaysFinite()
        .biomeWhitelist('forge:is_overworld')
        .id('gaia:rich_metal_vein')

    event.recipes.createoreexcavation.drilling(
        Item.of('minecraft:raw_iron', 3),
        'gaia:rich_metal_vein', 300
    ).id('gaia:rich_metal_any_drill')

    event.recipes.createoreexcavation.drilling(
        [
            Item.of('minecraft:raw_iron', 5),
            Item.of('mekanism:raw_osmium', 1)
        ],
        'gaia:rich_metal_vein', 250
    ).drill('gaia:osmium_drill_head').priority(1).id('gaia:rich_metal_osmium_head')

    event.recipes.createoreexcavation.drilling(
        [
            Item.of('minecraft:raw_iron', 8),
            Item.of('mekanism:raw_osmium', 2),
            coeutil.processingOutput('gaia:resource_catalyst', 0.03)
        ],
        'gaia:rich_metal_vein', 200
    ).drill('gaia:refined_obsidian_drill_head').priority(2).id('gaia:rich_metal_robs_head')

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
    event.recipes.createoreexcavation.vein(
        { text: 'Mythic Vein', color: 'light_purple' },
        'minecraft:ancient_debris'
    )
        .placement(2048, 256, 19384756)
        .veinSize(1, 1)
        .alwaysFinite()
        .biomeBlacklist('forge:is_overworld')
        .id('gaia:mythic_vein')

    event.recipes.createoreexcavation.drilling(
        Item.of('minecraft:netherrack', 1),
        'gaia:mythic_vein', 600
    ).id('gaia:mythic_any_drill')

    event.recipes.createoreexcavation.drilling(
        [
            Item.of('gaia:mythic_catalyst', 2),
            Item.of('minecraft:ancient_debris', 1),
            coeutil.processingOutput('gaia:singularity_shard', 0.1)
        ],
        'gaia:mythic_vein', 400
    ).drill('gaia:gaia_infused_drill_head').priority(1).id('gaia:mythic_gaia_head')

    // ─── Catalyst Node (T4, immer finite) ────────────────────────────────────
    event.recipes.createoreexcavation.vein(
        { text: 'Catalyst Node', color: 'gold' },
        'gaia:catalyst_node'
    )
        .placement(2048, 256, 73849201)
        .veinSize(1, 1)
        .alwaysFinite()
        .biomeWhitelist('forge:is_overworld')
        .id('gaia:catalyst_node_vein')

    event.recipes.createoreexcavation.drilling(
        [
            Item.of('gaia:resource_catalyst', 2),
            coeutil.processingOutput('gaia:resource_catalyst', 1)
        ],
        'gaia:catalyst_node_vein', 500
    ).id('gaia:catalyst_node_any_drill')

    event.recipes.createoreexcavation.drilling(
        [
            Item.of('gaia:resource_catalyst', 5),
            coeutil.processingOutput('gaia:mythic_catalyst', 0.08)
        ],
        'gaia:catalyst_node_vein', 300
    ).drill('gaia:catalyst_drill_head').priority(1).id('gaia:catalyst_node_catalyst_head')

    // ─── Catalyst Ley Line (T4, immer infinite) ───────────────────────────────
    event.recipes.createoreexcavation.vein(
        { text: 'Catalyst Ley Line', color: 'light_purple' },
        'gaia:catalyst_node'
    )
        .placement(4096, 512, 91827364)
        .veinSize(1, 1)
        .alwaysInfinite()
        .biomeWhitelist('forge:is_overworld')
        .id('gaia:catalyst_ley_line')

    event.recipes.createoreexcavation.drilling(
        Item.of('minecraft:cobblestone', 1),
        'gaia:catalyst_ley_line', 800
    ).id('gaia:ley_line_any_drill')

    event.recipes.createoreexcavation.drilling(
        [
            Item.of('gaia:resource_catalyst', 3),
            coeutil.processingOutput('gaia:mythic_catalyst', 0.05)
        ],
        'gaia:catalyst_ley_line', 350
    ).drill('gaia:catalyst_drill_head').priority(1).id('gaia:ley_line_catalyst_head')
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
        'gaia:catalyst_drill_head',
        'gaia:gaia_infused_drill_head'
    ])
})
