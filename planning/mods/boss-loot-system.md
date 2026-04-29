# Boss Loot System — "OP Loot" Integration

> **Status**: Konzept — 2026-04-29
> Ziel: Bosse aus Cataclysm, Mowzie's Mobs und Iron's Spells sollen Belohnungen liefern, die über Vanilla/Standard hinausgehen.

---

## Kern-Konzept

Der Loot wird in drei Kategorien unterteilt:
1. **Unikale Waffen/Relikte**: Direkt aus der Boss-Mod (z.B. Cataclysm).
2. **Apotheosis Escalation**: Garantierte High-Tier Gems und Affixe.
3. **Technik-Ingredienzen**: Materialien, die für das Late-Game in Create/Mekanism nötig sind.

---

## Boss-Tiering & Belohnungen

### Tier 1: Exploration Bosses (Frühspiel)
*   **Bosse**: Ferrous Wroughtnaut (Mowzie's), Corrupt Ogre (Dungeons & Taverns).
*   **Artifacts/Relics**: Chance auf seltene Trinkets (Bunny Hoppers, Power Glove).
*   **Apotheosis**: 100% Drop von *Common* bis *Uncommon* Gems.
*   **Tech**: Komponenten für Create-Pressen und Mixer.

### Tier 2: Mid-Game Challenges
*   **Bosse**: Netherite Monstrosity (Cataclysm), Dead King (Iron's Spells).
*   **Apotheosis**: Garantierter *Epic Gem*. Items droppen mit dem Affix "Reforged".
*   **Relics**: XP-Boost für getragene Relikte.
*   **Tech**: Erster Drop von "Ancient Metal" (benötigt für AE2 ME-Controller).

### Tier 3: Apex Bosses (Endgame)
*   **Bosse**: Ignis, The Harbinger, Ender Guardian (alle Cataclysm).
*   **Apotheosis**: Garantierter *Mythic Gem*. Chance auf "Godly" Affixe.
*   **Artifacts**: Unikate wie der *Eternal Compass* oder *Void Totem*.
*   **Tech**: "Singularity Shards" für den Mekanism Fusion Reactor oder Create Aeronautics Apex-Antriebe.

---

## Automatisierung (Late-Game)

Statt technischer Simulation nutzen wir den magischen Pfad von **Ars Nouveau**:

1.  **Drygmies**: Diese Geister sammeln Loot von Mobs/Bossen in ihrer Nähe, ohne diese zu töten.
2.  **Herausforderung**: 
    *   **Containment**: Der Boss muss lebend in Reichweite der Drygmies gehalten werden (z.B. in einer verstärkten Zelle aus Create-Blöcken).
    *   **Source-Infrastruktur**: Drygmies benötigen eine konstante Zufuhr von **Source** (Magie-Energie), um zu arbeiten.
3.  **Vorteil**: Keine "toten" Simulationen, sondern eine lebendige Boss-Farm, die toll aussieht.

---

## KubeJS Integration (Planung)
...
Um den Loot "OP" zu machen, müssen wir die Loot-Tables via KubeJS anpassen:

```javascript
// Beispiel für Cataclysm Ignis Loot-Modification
LootJS.modifiers((event) => {
    event.addEntityLootModifier("cataclysm:ignis")
        .addLoot("apotheosis:gem{gem:\"apotheosis:core/fire\", rarity:\"mythic\"}")
        .addLoot("create_aeronautics:apex_core_fragment")
        .addWeightedLoot([1, 5], ["minecraft:netherite_upgrade_smithing_template"]);
});
```

---

## Balancing-Regeln

1. **Kein Grind**: Bosse sollten einmalig (oder selten) besiegt werden müssen, um den Fortschritt zu triggern, statt 100x gefarmt zu werden.
2. **Qualität vor Quantität**: Lieber ein extrem mächtiges Item (OP) als ein Inventar voller Schrott.
3. **Synergie**: Boss-Loot sollte den Bau der "Fliegenden Festung" (Create Aeronautics) beschleunigen oder erst ermöglichen.
