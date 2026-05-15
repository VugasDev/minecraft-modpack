// 00_custom_items.js — Custom Items, Blocks & Fluids (Namespace: gaia)

// ─── FLUIDS ──────────────────────────────────────────────────────────────────

StartupEvents.registry('fluid', event => {

    // Mythic Liquid XP — T5 Crafting-Fluid, höchste XP-Konzentration
    // Herstellung: Hyper Experience + Singularity Shard im Create Mixer
    // Verwendung: Catalyst Altar für Mythic Catalyst (statt Hyper Experience)
    event.create('gaia:mythic_liquid_xp')
        .displayName('Mythic Liquid XP')
        .bucketItem(item => {
            item.displayName('Bucket of Mythic Liquid XP')
            item.rarity('epic')
            item.glow(true)
        })
        .viscosity(800)
        .density(1800)
        .color(0xFF00CCFF)
})

// ─── ITEMS ───────────────────────────────────────────────────────────────────

StartupEvents.registry('item', event => {

    // --- Progression: Catalyst-System ---

    // Resource Catalyst — Gate für T3 MA-Samen
    // Quellen: Ore Excavation (0.5%), Mech Crafter, Mowzie Bosses, Dungeon-Kisten, Wandering Trader
    event.create('gaia:resource_catalyst')
        .displayName('Resource Catalyst')
        .maxStackSize(64)
        .rarity('rare')
        .glow(true)

    // Mythic Catalyst — Gate für T4 MA-Samen (Mekanism-Metalle)
    // Quellen: Cataclysm Apex-Bosse, Drygmy-Farm mit Boss-Effigy
    event.create('gaia:mythic_catalyst')
        .displayName('Mythic Catalyst')
        .maxStackSize(16)
        .rarity('epic')
        .glow(true)

    // --- Progression: Boss-Drops ---

    // Singularity Shard — Drop von Cataclysm Apex-Bossen (Ignis, Harbinger, Ender Guardian)
    // Verwendung: Fusion Reactor Controller-Rezept
    event.create('gaia:singularity_shard')
        .displayName('Singularity Shard')
        .maxStackSize(16)
        .rarity('epic')

    // --- Progression: Endgame-Token ---

    // Gaia Awakening Token — Vergabe nach vollständigem Modpack-Abschluss
    // Verwendung: FTB Quests Sieg-Quest "Gaia Awakens" (Item-Submission)
    event.create('gaia:gaia_awakening_token')
        .displayName('Gaia Awakening Token')
        .maxStackSize(1)
        .rarity('epic')
        .glow(true)

    // --- XP-System ---

    // Mythic XP Shard — kondensierte Form von Mythic Liquid XP (~10.000 mB)
    // Crafting: Apotheosis Gem Dust + Create:EI XP Item + Singularity Shard
    // Alternative: aus Mythic Liquid XP durch Create-Mischrezept
    event.create('gaia:mythic_xp_shard')
        .displayName('Mythic XP Shard')
        .maxStackSize(64)
        .rarity('epic')
        .glow(true)

    // --- Ore Processing (Custom Outputs) ---

    // Zerquetschtes Osmium — Create Crushing-Output für Osmium-Erz (T2)
    event.create('gaia:crushed_osmium')
        .displayName('Crushed Raw Osmium')

    // Veredelte Pellets — PNC Pressure Chamber Output (T5), schmelzbar zu Barren (x1.5 Rate)
    event.create('gaia:refined_iron_pellet')
        .displayName('Refined Iron Pellet')
        .rarity('uncommon')

    event.create('gaia:refined_gold_pellet')
        .displayName('Refined Gold Pellet')
        .rarity('uncommon')

    event.create('gaia:refined_osmium_pellet')
        .displayName('Refined Osmium Pellet')
        .rarity('uncommon')

    // --- Drill Heads: Ore Excavation Upgrade-Pfad ---
    // Jeder Head skaliert den Resource Catalyst Drop-Bonus (06_loot_modifications.js)
    // und kann spezifische Bonus-Drops für bestimmte Ressourcen geben (10_drill_heads.js)

    // Osmium Drill Head — T3-Gate, +1% Catalyst-Drop, +Osmium-Bonus
    event.create('gaia:osmium_drill_head')
        .displayName('Osmium Drill Head')
        .rarity('uncommon')
        .maxStackSize(1)

    // Refined Obsidian Drill Head — T4-Gate, +3% Catalyst-Drop, +alle Metall-Bonus
    event.create('gaia:refined_obsidian_drill_head')
        .displayName('Refined Obsidian Drill Head')
        .rarity('rare')
        .maxStackSize(1)

    // Gaia-Infused Drill Head — T5, garantierter Catalyst bei Erzadern, +Singularity Shard-Chance
    event.create('gaia:gaia_infused_drill_head')
        .displayName('Gaia-Infused Drill Head')
        .rarity('epic')
        .maxStackSize(1)
        .glow(true)

    // Crystal Drill Head — Spezialkopf für Certus Quartz / Fluix / Amethyst Bonus
    event.create('gaia:crystal_drill_head')
        .displayName('Crystal Drill Head')
        .rarity('rare')
        .maxStackSize(1)

    // Nether Drill Head — Spezialkopf für Nether-Ressourcen (Quartz, Blaze, Gold)
    event.create('gaia:nether_drill_head')
        .displayName('Nether Drill Head')
        .rarity('rare')
        .maxStackSize(1)
})

// ─── BLOCKS ──────────────────────────────────────────────────────────────────

StartupEvents.registry('block', event => {

    // Gaia Core — Zentralblock der Gaia-Kathedrale, finales Ziel des Modpacks
    // Rechtsklick: Status, Schleichen+Rechtsklick: Vollscan (04_gaia_scanner.js)
    event.create('gaia:gaia_core')
        .displayName('Gaia Core')
        .hardness(50)
        .resistance(3600)
        .lightLevel(10)

    // Gaia Pillar — Eckpfeiler der Kathedrale, 4 Stück an definierten Positionen
    event.create('gaia:gaia_pillar')
        .displayName('Gaia Pillar')
        .hardness(30)
        .resistance(3600)

    // Catalyst Altar — Aktive Catalyst-Erzeugung via Create:EI Liquid XP Spout
    // Pfad 3c: 4× Apotheosis Gems + Mythic Liquid XP → Resource Catalyst (08_catalyst_system.js)
    event.create('gaia:catalyst_altar')
        .displayName('Catalyst Altar')
        .hardness(3.5)
        .resistance(6.0)
        .lightLevel(0.4)
        .tagBlock('minecraft:mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')

    // Crystalline Bookshelf — T3-Verzauberungsregal
    // Apotheosis: Eterna +4.0 / Quanta +0.75 / Arcana +0.5
    event.create('gaia:crystalline_bookshelf')
        .displayName('Crystalline Bookshelf')
        .hardness(1.5)
        .resistance(1.5)

    // Stellar Bookshelf — T4-Verzauberungsregal
    // Apotheosis: Eterna +6.0 / Quanta +1.0 / Arcana +0.75
    event.create('gaia:stellar_bookshelf')
        .displayName('Stellar Bookshelf')
        .hardness(1.5)
        .resistance(1.5)
})
