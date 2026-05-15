// 08_catalyst_system.js
// 3-Pfad Catalyst-System für MA T3+T4 Seed-Gating
//
// Pfade:
//   1. Passiv: Drop von Ore Excavation Veins (06_loot_modifications.js)
//   2. MA-Alternativ: Mechanical Crafter Rezept (siehe unten)
//   3. Aktiv: Boss/Dungeon Drops (06_loot_modifications.js) + Catalyst Altar (siehe unten)
//
// Mythic Catalyst: nur Cataclysm Apex-Bosse → via Drygmys automatisierbar (Ars Nouveau)

ServerEvents.recipes(event => {

    // ==========================================================================
    // PFAD 2: MA-Alternativ — Mechanical Crafter Recipe für Resource Catalyst
    // ==========================================================================
    // Verlangt T2 MA Essences (Iron + Lapis + Quartz) + Apotheosis Gem + Bone Block.
    // Kann NUR im Mechanical Crafter gecraftet werden — keine Crafting-Table-Variante.
    // Erzwingt Brass-Tier Create-Adoption auch für reine Bauern.
    //
    // TODO: Verifiziere mystical_agriculture Essence-IDs in 1.21.1 (könnte
    //       'mystical_agriculture:iron_essence' oder 'mysticalagriculture:iron_essence' sein)
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
            G: 'apotheosis:common_material'   // Common Gem-Material aus Apotheosis
        }
    )

    // ==========================================================================
    // PFAD 3c: Catalyst Altar — Create:EI Spout Rezepte
    // ==========================================================================
    // Variante A: Hyper Experience (1000 mB) → Resource Catalyst
    // Altar bleibt erhalten (per Recipe-Output zurückgegeben).
    event.recipes.create.filling(
        ['gaia:resource_catalyst', 'gaia:catalyst_altar'],
        ['gaia:catalyst_altar', Fluid.of('create_enchantment_industry:hyper_experience', 1000)]
    )

    // Variante B: Mythic Liquid XP (500 mB) → Mythic Catalyst
    // Mythic Liquid XP ist konzentrierter — halb so viel mB wie Hyper XP für den Resource Catalyst,
    // aber Erzeugung von Mythic Liquid XP selbst ist teurer (braucht Singularity Shard im Mixer).
    event.recipes.create.filling(
        ['gaia:mythic_catalyst', 'gaia:catalyst_altar'],
        ['gaia:catalyst_altar', Fluid.of('gaia:mythic_liquid_xp', 500)]
    )

    // ==========================================================================
    // MYTHIC LIQUID XP HERSTELLUNG — Create Mixing-Rezept
    // ==========================================================================
    // Hyper Experience (2000 mB) + Singularity Shard → Mythic Liquid XP (1000 mB)
    // Erfordert Heated Mixing (Blaze Burner unter dem Mixer).
    // Progression: Shard erst nach Apex-Boss-Kill verfügbar → natürlicher Gate.
    event.recipes.create.mixing(
        [Fluid.of('gaia:mythic_liquid_xp', 1000)],
        [
            Fluid.of('create_enchantment_industry:hyper_experience', 2000),
            'gaia:singularity_shard'
        ]
    ).heated()

    // ==========================================================================
    // MA SEED-OVERRIDES — T3 Seeds verlangen gaia:resource_catalyst zusätzlich
    // ==========================================================================
    // Standard MA T3 Seed Recipe: 4× Inferium Essence + 4× T2 Seeds + 1× Tier-Material
    // Custom: ergänzt um 1× Catalyst.
    //
    // TODO: Verifiziere die exakten Standard-Rezept-IDs in MA 1.21.1.
    //       Möglicherweise heißen sie 'mysticalagriculture:gold_seeds' o.ä.
    const t3Seeds = [
        { seed: 'mysticalagriculture:gold_seeds',    base: 'minecraft:gold_ingot' },
        { seed: 'mysticalagriculture:diamond_seeds', base: 'minecraft:diamond' },
        { seed: 'mysticalagriculture:emerald_seeds', base: 'minecraft:emerald' },
        { seed: 'mysticalagriculture:glowstone_seeds', base: 'minecraft:glowstone_dust' }
    ]
    t3Seeds.forEach(({ seed, base }) => {
        event.remove({ output: seed })
        event.shaped(seed, [
            'IBI',
            'BCB',
            'IBI'
        ], {
            I: 'mysticalagriculture:inferium_essence',
            B: base,
            C: 'gaia:resource_catalyst'
        })
    })

    // ==========================================================================
    // MA SEED-OVERRIDES — T4 Seeds verlangen gaia:mythic_catalyst zusätzlich
    // ==========================================================================
    // Mekanism + AE2 Seeds aus Mystical Agradditions (T4).
    // Mythic Catalyst kommt NUR aus Cataclysm Apex-Bosse + Drygmys.
    //
    // TODO: Verifiziere mysticalagradditions Seed-IDs
    const t4Seeds = [
        { seed: 'mysticalagradditions:osmium_seeds',   base: 'mekanism:ingot_osmium' },
        { seed: 'mysticalagradditions:tin_seeds',      base: 'mekanism:ingot_tin' },
        { seed: 'mysticalagradditions:lead_seeds',     base: 'mekanism:ingot_lead' },
        { seed: 'mysticalagradditions:uranium_seeds',  base: 'mekanism:ingot_uranium' },
        { seed: 'mysticalagradditions:fluorite_seeds', base: 'mekanism:fluorite_gem' }
    ]
    t4Seeds.forEach(({ seed, base }) => {
        event.remove({ output: seed })
        event.shaped(seed, [
            'IBI',
            'BMB',
            'IBI'
        ], {
            I: 'mysticalagriculture:prudentium_essence',
            B: base,
            M: 'gaia:mythic_catalyst'
        })
    })
})
