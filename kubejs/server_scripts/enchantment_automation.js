// src/kubejs/server_scripts/enchantment_automation.js
ServerEvents.recipes(event => {
    // Erzwinge Apotheosis-Caps durch KubeJS (falls Config nicht reicht)
    // Hinweis: Die tatsächlichen Caps werden oft via JSON in /config/apotheosis gesteuert
    
    // Rezept: Hyper Experience
    // 100 mB Liquid XP + Mixer = 10 mB Hyper XP
    event.custom({
        type: 'create:mixing',
        ingredients: [
            { fluid: 'create_enchantment_industry:experience', amount: 100 }
        ],
        results: [
            { fluid: 'create_enchantment_industry:hyper_experience', amount: 10 }
        ],
        processingTime: 200
    })
})
