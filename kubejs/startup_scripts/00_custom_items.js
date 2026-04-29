// 00_custom_items.js
// Custom Items & Blocks für Modpack-Progression (Namespace: apex)

StartupEvents.registry('item', event => {

    // Singularity Shard — Beweis der Überwindung eines Cataclysm Apex-Bosses
    // Drop via LootJS: server_scripts/06_loot_modifications.js
    // Verwendung: Mekanism Fusion Reactor Controller (server_scripts/05_progression_gates.js)
    event.create('apex:singularity_shard')
        .displayName('Singularity Shard')
        .maxStackSize(16)
        .rarity('epic')

    // Gaia Awakening Token — einmalig vergeben wenn alle Kathedrale-Module aktiv sind
    // Verwendung: FTB Quests Sieg-Quest "Gaia-Erwachen" (Item-Submission Task)
    event.create('apex:gaia_awakening_token')
        .displayName('Gaia Awakening Token')
        .maxStackSize(1)
        .rarity('epic')
        .glow(true)
})

StartupEvents.registry('block', event => {

    // Gaia Core — Zentralblock der Gaia-Kathedrale, finales Ziel des Modpacks
    // Rechtsklick: Status, Schleichen+Rechtsklick: Vollscan (server_scripts/04_gaia_scanner.js)
    event.create('apex:gaia_core')
        .displayName('Gaia Core')
        .hardness(50)
        .resistance(3600)
        .lightLevel(10)

    // Gaia Pillar — Eckpfeiler der Kathedrale, 4 Stück an definierten Positionen
    // Exakte Koordinaten zeigt der Gaia-Scan an
    event.create('apex:gaia_pillar')
        .displayName('Gaia Pillar')
        .hardness(30)
        .resistance(3600)
})
