# Pneumaticraft — Enchantment Escalation Path

> **Design-Ziel**: Pneumaticraft als optionaler aber lohnender Endgame-Pfad.
> Die Pressure Chamber ist die einzige Möglichkeit, Enchantments über Apotheosis-Limits zu heben.
> Spieler können normale Apotheosis-Enchants nutzen — aber wer OP will, muss Pneumaticraft meistern.

---

## Enchantment-Tier-System

| Tier | Level-Range | Crafting-Station | Druck | Gate |
|------|------------|-----------------|-------|------|
| T1 — Normal | 1–5 | Vanilla Anvil | — | Sofort |
| T2 — Enhanced | 6–10 | Apotheosis Enchanting | — | Apotheosis-Tisch Tier 3 |
| T3 — Advanced | 11–25 | Pressure Chamber | 2–4 bar | Pneumaticraft freigeschaltet |
| T4 — Elite | 26–50 | Pressure Chamber | 4–6 bar | High-Pressure-Upgrade |
| T5 — Godlike | 51–100 | Pressure Chamber | 6–8+ bar | Endgame-Materialien |

---

## Apotheosis-Config-Anpassungen

In `src/config/apotheosis/enchanting.json` (oder ähnlich):

```json
{
  "enchantment_caps": {
    "enabled": true,
    "remove_max_level_cap": true,
    "allow_above_max_on_anvil": true
  }
}
```

> Apotheosis erlaubt per Config das Entfernen der Enchantment-Level-Caps.
> Ohne diese Config-Änderung ignoriert das Spiel Level > Vanilla-Max beim Anvil.

---

## KubeJS — Pressure Chamber Rezepte

Datei: `src/kubejs/server_scripts/pneumaticraft_enchantments.js`

### Prinzip

Jedes Upgrade kombiniert:
- N×  Buch (aktueller Level)
- Spezielle Materialien (steigen mit Tier)
- Druck-Anforderung (steigt mit Tier)

### Tier 3: Level 6-10 → Level 25 (Druck: 3.5 bar)

```javascript
// Beispiel: Sharpness X → Sharpness XXV
// Materialien: Mekanism Refined Obsidian + Apotheosis Gem (Normal)
ServerEvents.recipes(event => {

  // Helfer-Funktion: Pressure Chamber Recipe
  const pressureChamber = (inputs, outputs, pressure) => {
    event.custom({
      type: "pneumaticcraft:pressure_chamber",
      inputs: inputs,
      outputs: outputs,
      pressure: pressure
    })
  }

  // Sharpness: T2 (X) → T3 (XXV)
  pressureChamber(
    [
      { item: "minecraft:enchanted_book", count: 3,
        nbt: '{"StoredEnchantments":[{"id":"minecraft:sharpness","lvl":10}]}' },
      { item: "mekanism:ingot_refined_obsidian", count: 4 },
      { item: "apotheosis:gem_normal", count: 2 }
    ],
    [
      { item: "minecraft:enchanted_book",
        nbt: '{"StoredEnchantments":[{"id":"minecraft:sharpness","lvl":25}]}' }
    ],
    3.5
  )

  // Protection: T2 (X) → T3 (XXV)
  pressureChamber(
    [
      { item: "minecraft:enchanted_book", count: 3,
        nbt: '{"StoredEnchantments":[{"id":"minecraft:protection","lvl":10}]}' },
      { item: "mekanism:ingot_refined_obsidian", count: 4 },
      { item: "apotheosis:gem_normal", count: 2 }
    ],
    [
      { item: "minecraft:enchanted_book",
        nbt: '{"StoredEnchantments":[{"id":"minecraft:protection","lvl":25}]}' }
    ],
    3.5
  )

  // ... weitere Enchantments nach demselben Muster

})
```

### Tier 4: Level 25 → Level 50 (Druck: 5.5 bar)

```javascript
  // Sharpness: T3 (XXV) → T4 (L)
  pressureChamber(
    [
      { item: "minecraft:enchanted_book", count: 2,
        nbt: '{"StoredEnchantments":[{"id":"minecraft:sharpness","lvl":25}]}' },
      { item: "ae2:fluix_crystal", count: 8 },
      { item: "apotheosis:gem_epic", count: 1 },
      { item: "mekanism:alloy_atomic", count: 2 }
    ],
    [
      { item: "minecraft:enchanted_book",
        nbt: '{"StoredEnchantments":[{"id":"minecraft:sharpness","lvl":50}]}' }
    ],
    5.5
  )
```

### Tier 5: Level 50 → Level 100 (Druck: 7.5 bar)

```javascript
  // Sharpness: T4 (L) → T5 (C)
  pressureChamber(
    [
      { item: "minecraft:enchanted_book", count: 2,
        nbt: '{"StoredEnchantments":[{"id":"minecraft:sharpness","lvl":50}]}' },
      { item: "ae2:certus_quartz_crystal_charged", count: 16 },
      { item: "apotheosis:gem_mythic", count: 1 },
      { item: "mekanism:ingot_refined_glowstone", count: 8 },
      { item: "create:precision_mechanism", count: 4 }
    ],
    [
      { item: "minecraft:enchanted_book",
        nbt: '{"StoredEnchantments":[{"id":"minecraft:sharpness","lvl":100}]}' }
    ],
    7.5
  )
```

---

## Priorisierte Enchantments für das System

Diese Enchantments bekommen alle 5 Tier-Rezepte:

### Offensiv
| Enchantment | T3 (25) | T4 (50) | T5 (100) |
|-------------|---------|---------|----------|
| Sharpness | ✓ | ✓ | ✓ |
| Power (Bogen) | ✓ | ✓ | ✓ |
| Smite | ✓ | ✓ | — |
| Bane of Arthropods | ✓ | ✓ | — |

### Defensiv
| Enchantment | T3 (25) | T4 (50) | T5 (100) |
|-------------|---------|---------|----------|
| Protection | ✓ | ✓ | ✓ |
| Fire Protection | ✓ | ✓ | — |
| Blast Protection | ✓ | ✓ | — |
| Feather Falling | ✓ | ✓ | — |

### Utility
| Enchantment | T3 (25) | T4 (50) | T5 (100) |
|-------------|---------|---------|----------|
| Efficiency | ✓ | ✓ | ✓ |
| Fortune | ✓ | ✓ | — |
| Looting | ✓ | ✓ | — |
| Unbreaking | ✓ | ✓ | — |
| Mending | ✓ | — | — |

> **T5 (100)** bleibt auf wenige ikonische Enchants beschränkt: Sharpness, Protection, Efficiency.
> Das behält den "Godlike"-Charakter dieser Items.

---

## Materialien-Übersicht pro Tier

| Tier | Hauptmaterialien | Druck | Beschaffung |
|------|-----------------|-------|-------------|
| T3 (→25) | Mekanism Refined Obsidian, Apotheosis Gem Normal | 3.5 bar | Mid-Game |
| T4 (→50) | AE2 Fluix Crystal, Apotheosis Gem Epic, Mekanism Atomic Alloy | 5.5 bar | Late-Game |
| T5 (→100) | AE2 Charged Certus, Apotheosis Gem Mythic, Mekanism Glowstone, Create Precision Mech. | 7.5 bar | Endgame |

> Alle Materialien aus verschiedenen Mod-Pfaden → verhindert Single-Mod-Rush

---

## Quest-Chapter: "Drucksachen"

Geplante Quest-Kette für Pneumaticraft:

1. **"Erste Kompression"** — Baue einen Compressor
2. **"Die Kammer"** — Baue eine vollständige Pressure Chamber
3. **"Unter Druck"** — Erreiche 4 bar
4. **"Enhanced Enchanting"** — Erste Tier-3-Enchantment (Level 25)
5. **"Hochdruckzone"** — Erreiche 6 bar (High-Pressure-Upgrade)
6. **"Elite-Level"** — Erste Tier-4-Enchantment (Level 50)
7. **"Der Gottesmodus"** — Erste Tier-5-Enchantment (Level 100)
8. **"Unzerstörbar"** — Lege ein Level-100-Enchantment auf ein Netherite-Item

---

## Balancing-Überlegungen

- **Pressure Chamber ≠ Anfänger-Content**: Die benötigten Materialien garantieren, dass dies Late-Game bleibt
- **Druck ist das Gate**: Höherer Druck erfordert bessere Kompressoren (Pneumaticraft-Progression)
- **Materialien sind mod-übergreifend**: Spieler MÜSSEN AE2, Mekanism UND Apotheosis vorantreiben
- **Anzahl der Input-Bücher**: Mehrere Bücher als Input verhindert "1 Buch = 1 God-Book"
- **Kein Mending T5**: Mending Level 100 wäre absolut overpowered — bleibt auf T3 limitiert

---

## Offene Implementierungsfragen

- [ ] Apotheosis-Config: Exakter Config-Key für Level-Cap-Removal prüfen
- [ ] NBT-Syntax für StoredEnchantments in NeoForge 1.21.1 verifizieren (ggf. `"id"` → `"id"` als ResourceLocation)
- [ ] Pneumaticraft KubeJS-Integration testen (Plugin vorhanden?)
- [ ] Pressure-Werte balancieren (7.5 bar = High-Pressure-Tier in Pneumaticraft?)
- [ ] Apotheosis Gem-Namen/IDs verifizieren
