// 06_loot_modifications.js
// Benötigt: LootJS Mod (https://modrinth.com/mod/lootjs) — zur Mod-Liste hinzufügen!
// Cataclysm Entity-IDs: im Spiel via /kubejs probe oder Jade verifizieren
LootJS.modifiers(event => {

    // Cataclysm Apex-Bosse droppen Singularity Shards (1–2 pro Kill)
    // Benötigt für: Fusion Reactor Controller (Progression Gate Tier 5)
    const apexBosses = [
        'cataclysm:ignis',
        'cataclysm:the_harbinger',
        'cataclysm:ender_guardian'
    ]
    apexBosses.forEach(boss => {
        event.addEntityLootModifier(boss)
            .addLoot(LootEntry.of('apex:singularity_shard').withCount(1, 2))
    })
})
