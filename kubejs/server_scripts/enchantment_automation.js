// enchantment_automation.js
// Create:EI Liquid XP → Hyper Experience Konversion via Create Mixer.
// Nutzt KubeJS High-Level Create API (vermeidet 1.21.1 Recipe-JSON Format-Probleme).

ServerEvents.recipes(event => {
    // 100 mB Liquid XP + Mixer → 10 mB Hyper Experience (10:1 Verhältnis)
    // Hyper XP wird im Catalyst Altar (08_catalyst_system.js) verwendet
    // und für T5-Enchanting (planning/enchantment-system.md)
    event.recipes.create.mixing(
        Fluid.of('create_enchantment_industry:hyper_experience', 10),
        Fluid.of('create_enchantment_industry:experience', 100)
    ).processingTime(200)
})
