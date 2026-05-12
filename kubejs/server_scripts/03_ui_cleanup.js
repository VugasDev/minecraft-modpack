// 03_ui_cleanup.js
// REI/JEI Item-Hiding: KubeJS 2101.7+ unterstützt 'ClientEvents.hideJEIOrREI' nicht mehr.
// Korrekter Weg in KubeJS 2101.x: REI/JEI Items über das c:hidden_from_recipe_viewers Tag verstecken.
ServerEvents.tags('item', event => {
    // Duplicate Copper Ingots aus REI/JEI verstecken (Create vs Mekanism Konflikt)
    // Wir behalten minecraft:copper_ingot als kanonische Variante (über Tag-Unification erreichbar)
    event.add('c:hidden_from_recipe_viewers', 'create:copper_ingot')
    event.add('c:hidden_from_recipe_viewers', 'mekanism:ingot_copper')
})
