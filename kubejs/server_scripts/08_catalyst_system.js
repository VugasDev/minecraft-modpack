// 08_catalyst_system.js
// 3-path Catalyst system for MA T3+T4 Seed gating
//
// Paths:
//   1. Passive:    Drop from Ore Excavation Veins (06_loot_modifications.js)
//   2. MA-Alt:     Mechanical Crafter recipe (below)
//   3. Active:     Boss/Dungeon drops (06_loot_modifications.js) + Catalyst Altar (below)
//
// Mythic Catalyst: Cataclysm Apex bosses only → automatable via Drygmys (Ars Nouveau)

// ==========================================================================
// MA SEED OVERRIDES — own block so Create-recipe errors don't kill these
// ==========================================================================

ServerEvents.recipes(event => {

    // T3 Seeds require gaia:resource_catalyst
    // Standard MA T3 recipe: 4× Inferium + 4× T2 material + center item
    // Override: center = Resource Catalyst
    const t3Seeds = [
        { seed: 'mysticalagriculture:gold_seeds',     base: 'minecraft:gold_ingot' },
        { seed: 'mysticalagriculture:diamond_seeds',  base: 'minecraft:diamond' },
        { seed: 'mysticalagriculture:emerald_seeds',  base: 'minecraft:emerald' },
        { seed: 'mysticalagriculture:glowstone_seeds',base: 'minecraft:glowstone_dust' }
    ]
    t3Seeds.forEach(function(entry) {
        event.remove({ output: entry.seed })
        event.shaped(entry.seed, [
            'IBI',
            'BCB',
            'IBI'
        ], {
            I: 'mysticalagriculture:inferium_essence',
            B: entry.base,
            C: 'gaia:resource_catalyst'
        })
    })

    // T4 Seeds (Mystical Agradditions) require gaia:mythic_catalyst
    // Mythic Catalyst only from Cataclysm Apex bosses + Drygmy farm
    const t4Seeds = [
        { seed: 'mysticalagradditions:osmium_seeds',   base: 'mekanism:ingot_osmium' },
        { seed: 'mysticalagradditions:tin_seeds',      base: 'mekanism:ingot_tin' },
        { seed: 'mysticalagradditions:lead_seeds',     base: 'mekanism:ingot_lead' },
        { seed: 'mysticalagradditions:uranium_seeds',  base: 'mekanism:ingot_uranium' },
        { seed: 'mysticalagradditions:fluorite_seeds', base: 'mekanism:fluorite_gem' }
    ]
    t4Seeds.forEach(function(entry) {
        event.remove({ output: entry.seed })
        event.shaped(entry.seed, [
            'IBI',
            'BMB',
            'IBI'
        ], {
            I: 'mysticalagriculture:prudentium_essence',
            B: entry.base,
            M: 'gaia:mythic_catalyst'
        })
    })
})

// ==========================================================================
// CREATE RECIPES — separate block; errors here don't affect seed overrides
// ==========================================================================

ServerEvents.recipes(event => {

    // PATH 2: MA-Alt — Mechanical Crafter recipe for Resource Catalyst
    // Requires T2 MA Essences (Iron + Lapis + Quartz) + Apotheosis Gem + center
    // Only craftable in Mechanical Crafter — no crafting table shortcut
    // TODO: verify apotheosis gem item ID in 1.21.1 (apotheosis:common_gem ?)
    event.recipes.create.mechanical_crafting(
        'gaia:resource_catalyst',
        [
            'III',
            'LGL',
            'QQQ'
        ],
        {
            I: 'mysticalagriculture:iron_essence',
            L: 'mysticalagriculture:lapis_essence',
            Q: 'mysticalagriculture:nether_quartz_essence',
            G: 'apotheosis:common_gem'
        }
    )

    // PATH 3c: Catalyst Altar — Create:EI Spout recipes
    // Variant A: Catalyst Altar + Hyper Experience (1000 mB) → Resource Catalyst
    event.recipes.create.filling(
        'gaia:resource_catalyst',
        ['gaia:catalyst_altar', Fluid.of('create_enchantment_industry:hyper_experience', 1000)]
    )

    // Variant B: Catalyst Altar + Mythic Liquid XP (500 mB) → Mythic Catalyst
    event.recipes.create.filling(
        'gaia:mythic_catalyst',
        ['gaia:catalyst_altar', Fluid.of('gaia:mythic_liquid_xp', 500)]
    )

    // MYTHIC LIQUID XP — Create Mixing recipe
    // Hyper Experience (2000 mB) + Singularity Shard → Mythic Liquid XP (1000 mB)
    // Requires heated mixing (Blaze Burner under Mixer)
    event.recipes.create.mixing(
        [Fluid.of('gaia:mythic_liquid_xp', 1000)],
        [
            Fluid.of('create_enchantment_industry:hyper_experience', 2000),
            'gaia:singularity_shard'
        ]
    ).heated()
})
