// 06_loot_modifications.js
// Benötigt: LootJS Mod
// Cataclysm/Mowzie's Entity-IDs: im Spiel via /kubejs probe oder Jade verifizieren
LootJS.modifiers(event => {

    // ==========================================================================
    // T5 SINGULARITY SHARDS (Cataclysm Apex-Bosse)
    // ==========================================================================
    // Benötigt für: Fusion Reactor Controller (server_scripts/05_progression_gates.js)
    const apexBosses = [
        'cataclysm:ignis',
        'cataclysm:the_harbinger',
        'cataclysm:ender_guardian'
    ]
    apexBosses.forEach(boss => {
        event.addEntityLootModifier(boss)
            .addLoot(LootEntry.of('gaia:singularity_shard').withCount(1, 2))
    })

    // ==========================================================================
    // T3 RESOURCE CATALYST — Aktiv-Pfad 3a: Boss-Drops (garantiert)
    // ==========================================================================
    // Mowzie's Mobs + frühe Cataclysm-Bosse droppen 1× Catalyst pro Kill.
    // Drygmy-kompatibel: Ars Nouveau Drygmys können das via Mob-Effigy automatisieren.
    const t3CatalystBosses = [
        'mowziesmobs:ferrous_wroughtnaut',
        'mowziesmobs:frostmaw',
        'mowziesmobs:naga',
        'mowziesmobs:barakoa',
        'cataclysm:netherite_monstrosity'   // Mid-Tier Cataclysm-Boss
    ]
    t3CatalystBosses.forEach(boss => {
        event.addEntityLootModifier(boss)
            .addLoot(LootEntry.of('gaia:resource_catalyst').withCount(1))
    })

    // ==========================================================================
    // T4 MYTHIC CATALYST — NUR Cataclysm Apex-Endbosse
    // ==========================================================================
    // Drygmy-Automatisierung: Cataclysm-Mob-Effigy + Drygmy Charm + Ritual.
    // Das ist die EINZIGE automatisierbare Quelle für Mythic Catalysts.
    // Alle anderen Endgame-Wege (Trader/Dungeons) liefern KEINEN Mythic Catalyst.
    apexBosses.forEach(boss => {
        event.addEntityLootModifier(boss)
            .addLoot(LootEntry.of('gaia:mythic_catalyst').withCount(1))
    })

    // ==========================================================================
    // T3 RESOURCE CATALYST — Aktiv-Pfad 3b: Dungeon-Loot (8% Chance)
    // ==========================================================================
    // When Dungeons Arise + YUNG's Better Dungeons + YUNG's Better Strongholds
    // TODO: Exakte Loot-Table-Pfade nach Boot verifizieren via /loottable list
    event.addLootTableModifier(/dungeons_arise:chests\/.*/)
        .randomChance(0.08)
        .addLoot(LootEntry.of('gaia:resource_catalyst').withCount(1))

    event.addLootTableModifier(/yungsbetterdungeons:chests\/.*/)
        .randomChance(0.08)
        .addLoot(LootEntry.of('gaia:resource_catalyst').withCount(1))

    event.addLootTableModifier(/yungsbetterstrongholds:chests\/.*/)
        .randomChance(0.10)
        .addLoot(LootEntry.of('gaia:resource_catalyst').withCount(1))

    // ==========================================================================
    // T3 RESOURCE CATALYST — Passiv-Pfad: Create Ore Excavation Vein Drops
    // ==========================================================================
    // 0.5% Drop pro extrahiertem Erz aus Veins.
    // Wirkt automatisch auf jeden Drill-Output da Veins ihre Loot-Table beim Mining verwenden.
    // TODO: Verifizieren ob Create Ore Excavation eigene Loot-Tabellen nutzt oder direktes
    //       Block-Drop System — bei letzterem ggf. via BlockEvents-Hook umsetzen.
    event.addLootTableModifier(/createoreexcavation:vein\/.*/)
        .randomChance(0.005)
        .addLoot(LootEntry.of('gaia:resource_catalyst').withCount(1))

})

// T3 RESOURCE CATALYST — Wandering Trader
// TODO: ServerEvents.trades existiert in KubeJS 2101 nicht — korrekten Event-Namen verifizieren.
// Mögliche Alternativen: EntityEvents.spawnedWithContext, NeoForge WandererTradesEvent via Mixin.
// Vorübergehend deaktiviert, damit keine Script-Fehler entstehen.
