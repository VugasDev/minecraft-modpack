// 07_enchanting_system.js
// Enchanting-System Rezepte & Progressions-Gates
//
// Tier-Struktur:
//   T1 — Vanilla Bookshelf       (max Eterna ~15)
//   T2 — Apotheosis Blazing      (Nether-Tier, Gate: Blaze Rod + Nether Brick)
//   T3 — gaia:crystalline        (Mekanism+AE2, Gate: Osmium + Certus)
//   T4 — gaia:stellar            (End-Tier, Gate: Refined Obsidian + Ender Pearl)
//
// Apotheosis Shelf Stats: kubejs/data/apotheosis/enchanting/shelves/
// Custom Items: startup_scripts/00_custom_items.js

ServerEvents.recipes(event => {

    // =========================================================================
    // T2: Blazing Bookshelf (Apotheosis)
    // Override: Vanilla-Apotheosis Rezept durch Create Blaze Burner gaten
    //
    // TODO: Verifiziere ob 'apotheosis:blazing_bookshelf' die korrekte Item-ID ist.
    //       Alternativ könnte die ID 'apotheosis:shelf_blazing' o.ä. sein.
    //       In-game mit /recipe check oder JEI prüfen.
    //
    // TODO: Falls Create Blaze Burner als Gate gewünscht: 'create:blaze_burner' als
    //       Ingredient C einsetzen statt vanilla bookshelf. Aktuell nur Nether-Material-Gate.
    // =========================================================================
    event.remove({ output: 'apotheosis:blazing_bookshelf' })
    event.shaped('apotheosis:blazing_bookshelf', [
        'ABA',
        'BCB',
        'ABA'
    ], {
        A: 'minecraft:nether_brick',
        B: 'minecraft:blaze_rod',
        C: 'minecraft:bookshelf'
        // TODO: verify item ID — könnte 'apotheosis:typeset_book' als Center sinnvoller sein
    })

    // =========================================================================
    // T3: Crystalline Bookshelf (apex)
    // Gate: Mekanism Osmium (Zone 3) + AE2 Certus Quartz
    // Apotheosis Stats: Eterna +4.0 / Quanta +0.75 / Arcana +0.5
    // =========================================================================
    event.shaped('gaia:crystalline_bookshelf', [
        'ABA',
        'BCB',
        'ABA'
    ], {
        A: 'mekanism:ingot_osmium',
        B: 'ae2:certus_quartz_crystal',
        C: 'minecraft:bookshelf'
    })

    // =========================================================================
    // T4: Stellar Bookshelf (apex)
    // Gate: Mekanism Refined Obsidian + End-Tier Materialien
    // Apotheosis Stats: Eterna +6.0 / Quanta +1.0 / Arcana +0.75
    //
    // Refined Obsidian ist Gate hinter Mekanism T3 (Obsidian Dust → Infusion Chamber)
    // Ender Pearl + End Stone signalisieren End-Dimension Erkundung
    // =========================================================================
    event.shaped('gaia:stellar_bookshelf', [
        'ABA',
        'BCB',
        'ABA'
    ], {
        A: 'mekanism:ingot_refined_obsidian',
        B: 'minecraft:ender_pearl',
        C: 'minecraft:end_stone'
        // TODO: Überlegen ob apotheosis:typeset_book sinnvoller als Center wäre
    })

    // =========================================================================
    // Apotheosis Vial of Expungement
    // Entfernt Enchantments von Items (Gem-Socketing Support)
    // Gate: Mekanism T1 (Osmium) + AE2 Certus — erst nach Zone 3
    //
    // TODO: Verifiziere ob 'apotheosis:vial_of_expungement' die korrekte Item-ID ist.
    //       Apotheosis 8.x könnte andere Item-IDs verwenden.
    //       Alternativ: 'apotheosis:vial_expungement' oder ähnlich — in JEI prüfen.
    // =========================================================================
    event.remove({ output: 'apotheosis:vial_of_expungement' })
    event.shaped('apotheosis:vial_of_expungement', [
        ' O ',
        'OCO',
        ' O '
    ], {
        O: 'mekanism:ingot_osmium',
        C: 'ae2:certus_quartz_crystal'
        // TODO: verify item IDs — Apotheosis 8.5.2 ID-Schema verifizieren
    })

    // =========================================================================
    // gaia:mythic_xp_shard
    // Konzentriertes Mythic Liquid XP (~10.000 mB Equivalent)
    // Gate: Apotheosis Endgame (gem_dust) + Create:EI XP + apex Singularity
    //
    // WICHTIG: Die folgenden IDs müssen in-game verifiziert werden:
    //   'apotheosis:gem_dust'       — TODO: verify; könnte nicht existieren in 8.5.2
    //   'create_ei:experience_nugget' — TODO: verify Create:EI item ID
    //       Alternativ: 'create_ei:experience_block', 'create_enchantedindustry:exp_nugget'
    //       o.ä. — in JEI/Modrinth Mod-Seite prüfen.
    // =========================================================================
    event.shaped('gaia:mythic_xp_shard', [
        'ABA',
        'BCB',
        'ABA'
    ], {
        // TODO: verify 'apotheosis:gem_dust' — in Apotheosis 8.5.2 existiert ggf. nur apotheosis:gem
        A: 'apotheosis:gem_dust',
        // TODO: verify Create:EI XP item ID — could be create_ei:experience_nugget or similar
        B: 'create_ei:experience_nugget',
        C: 'gaia:singularity_shard'
    })

})
