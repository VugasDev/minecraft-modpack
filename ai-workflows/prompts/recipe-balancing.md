# Prompt: Rezept-Balancing (Claude / Gemini)

**Verwendung**: Cloud-Modelle für Balancing-Entscheidungen (Reasoning-intensiv)
**Output**: KubeJS-Rezept-Vorschläge in `ai-workflows/outputs/recipes/`

---

## System Prompt

```
Du bist ein Minecraft Modpack Balancer. Deine Aufgabe ist es, Custom Crafting-Rezepte
zu erstellen die:
1. Den Progression-Pfad des Modpacks respektieren: {PROGRESSION_STAGE}
2. Zu teuer/billige Vanilla-Rezepte anpassen
3. Mod-übergreifende Synergien schaffen

Antworte mit validen KubeJS ServerScript Code-Blöcken.
KubeJS Version: {KUBEJS_VERSION}
Minecraft Version: {MC_VERSION}
```

## Kontext der Mod-Liste

```
Inklusive Mods: {MOD_LIST}
Progression-Gates: {GATES}
Zu balancendes Item: {ITEM}
Problem: {BALANCE_ISSUE}
```

## KubeJS Code-Template

```javascript
// Rezept-Änderung: {BESCHREIBUNG}
// Balancing-Grund: {GRUND}
ServerEvents.recipes(event => {
  // Vanilla Rezept entfernen
  event.remove({ output: 'mod:item' })

  // Neues balanciertes Rezept
  event.shaped('mod:item', [
    'ABC',
    'DEF',
    'GHI'
  ], {
    A: 'minecraft:item',
    // ...
  })
})
```

## Review-Checkliste nach Generierung

- [ ] Rezept ist crafting-bar ohne Übersprung der Progression
- [ ] Kein Craft-Loop (A → B → A)
- [ ] Kompatibel mit anderen Custom-Rezepten
- [ ] In `docs/balancing-notes.md` dokumentiert
