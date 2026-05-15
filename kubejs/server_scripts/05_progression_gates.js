// 05_progression_gates.js
// Fortgeschrittene Progressions-Locks
ServerEvents.recipes(event => {

    // --- Fusion Reactor Controller (T5 Endgame) ---
    // Erst nach Cataclysm Apex Boss (Ignis / Harbinger / Ender Guardian)
    // gaia:singularity_shard: custom Item, definiert in startup_scripts/00_custom_items.js
    // Drop-Vergabe: server_scripts/06_loot_modifications.js (benötigt LootJS)
    // mekanism:sps_casing entfernt — SPS benötigt Fusion Reactor → Zirkelbezug/Deadlock
    event.remove({id: 'mekanismgenerators:fusion_reactor_controller'})
    event.shaped('mekanismgenerators:fusion_reactor_controller', [
        'ABA',
        'CDC',
        'ABA'
    ], {
        A: 'mekanism:alloy_atomic',
        B: 'gaia:singularity_shard',
        C: 'mekanism:ingot_refined_obsidian',
        D: 'ae2:controller'
    })

    // --- AE2 ME-Controller (T3 Gate) ---
    // Plan (docs/balancing-notes.md): Create-Komponenten als Gate, damit
    // AE2 erst nach Create-Tier 2 (Precision Mechanism) erreichbar ist.
    // Verhindert "AE2-Skip" der Create-Automation.
    event.remove({id: 'ae2:network/blocks/controller'})
    event.shaped('ae2:controller', [
        'ABA',
        'CDC',
        'ABA'
    ], {
        A: 'create:precision_mechanism',
        B: 'minecraft:iron_block',
        C: 'create:propeller',
        D: 'ae2:engineering_processor'
    })

    // --- Mekanism Enrichment Chamber (T3 Gate) ---
    // Plan (docs/balancing-notes.md): Create-Gear-Gate, damit Ore-Doubling erst
    // nach etabliertem Create-Setup zugänglich ist.
    // Hinweis: Mekanism nutzt das Rezept-System mit Recipe Group "mekanism:processing".
    // Bei Issues nach Reload: alternativ event.replaceInput nutzen.
    event.remove({id: 'mekanism:enrichment_chamber'})
    event.shaped('mekanism:enrichment_chamber', [
        'ABA',
        'CDC',
        'ABA'
    ], {
        A: 'mekanism:ingot_osmium',
        B: 'create:cogwheel',
        C: 'create:large_cogwheel',
        D: 'mekanism:basic_control_circuit'
    })
})
