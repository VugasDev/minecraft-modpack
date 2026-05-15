// 00_custom_items.js — Custom Items, Blocks & Fluids (Namespace: gaia)

// ─── FLUIDS ──────────────────────────────────────────────────────────────────

StartupEvents.registry('fluid', event => {

    // Mythic Liquid XP — T5 Crafting-Fluid, höchste XP-Konzentration
    // Herstellung: Hyper Experience + Singularity Shard im Create Mixer
    // Verwendung: Catalyst Altar für Mythic Catalyst (statt Hyper Experience)
    event.create('gaia:mythic_liquid_xp')
        .displayName('Mythic Liquid XP')
        .stillTexture('gaia:fluid/mythic_liquid_xp_still')
        .flowingTexture('gaia:fluid/mythic_liquid_xp_flowing')
        .tint(0x00CCFF)
        .type(function(type) {
            type.viscosity(800)
            type.density(1800)
            type.lightLevel(4)
        })
    // Bucket-Item wird von KubeJS 2101 automatisch als gaia:mythic_liquid_xp_bucket erstellt
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

    // Catalyst Drill Head — T4-Spezialist für Catalyst Nodes und Ley Lines
    // Einziger Head der Catalyst Ley Lines (infinite) nutzbar macht
    // Kleine Mythic Catalyst Chance auf beiden Node-Typen
    event.create('gaia:catalyst_drill_head')
        .displayName('Catalyst Drill Head')
        .rarity('epic')
        .maxStackSize(1)
        .glow(true)
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

    // Catalyst Node — Weltgenerierungs-Block für Catalyst Nodes und Ley Lines
    // Spawn: selten, tief (Y < -32), glüht leicht
    // Abbau: jeder Drill → finite Catalysts; catalyst_drill_head → Ley Line infinite nutzbar
    event.create('gaia:catalyst_node')
        .displayName('Catalyst Node')
        .hardness(4.0)
        .resistance(8.0)
        .lightLevel(0.5)
        .tagBlock('minecraft:mineable/pickaxe')
        .tagBlock('minecraft:needs_iron_tool')

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
