// 05_progression_gates.js
// Fortgeschrittene Progressions-Locks
ServerEvents.recipes(event => {

    // Fusion Reactor erst nach Cataclysm Apex Boss (Ignis / Harbinger / Ender Guardian)
    // apex:singularity_shard: custom Item, definiert in startup_scripts/00_custom_items.js
    // Drop-Vergabe: server_scripts/06_loot_modifications.js (benötigt LootJS)
    // mekanism:sps_casing entfernt — SPS benötigt Fusion Reactor → Zirkelbezug/Deadlock
    event.remove({id: 'mekanismgenerators:fusion_reactor_controller'})
    event.shaped('mekanismgenerators:fusion_reactor_controller', [
        'ABA',
        'CDC',
        'ABA'
    ], {
        A: 'mekanism:alloy_atomic',
        B: 'apex:singularity_shard',
        C: 'mekanism:ingot_refined_obsidian',
        D: 'ae2:controller'
    })
})
