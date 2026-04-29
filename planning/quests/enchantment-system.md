# Vollständiges Enchantment-System

> Drei Mods, drei Rollen — kein Mod macht alles allein.

```
Create: Enchantment Industry  →  Automation, Kopieren, Kombinieren, Liquid XP
Enchantment Library Standalone →  Speichern & Abrufen von Fortschritt
Pneumaticraft Pressure Chamber →  Große Sprünge auf extreme Levels
```

---

## Übersicht: Tier-System

```
Level 1–5     Vanilla / Apotheosis Enchanting Table
Level 6–10    Apotheosis (Cap entfernt) + Create EI Blaze Forger Automation
Level 11–25   Pneumaticraft Pressure Chamber Tier 1  (2.5 bar)
Level 26–50   Create EI Pipeline: Library → Printer → Blaze Forger → Library
Level 51–100  Pneumaticraft Pressure Chamber Tier 2  (6.0 bar)
```

---

## Die drei Bausteine

### Baustein 1 — Create: Enchantment Industry

**Status**: ✓ NeoForge 1.21.1 (v2.2.4)

**Relevante Maschinen:**

| Maschine | Funktion |
|----------|---------|
| **Experience Hatch** | Spieler-XP → Liquid Experience (Fluid) |
| **Blaze Forger** | Automatisierter Amboss — kombiniert Bücher + Liquid XP |
| **Blaze Enchanter** | Hebt Enchantment-Level um +1 mit Liquid Hyper XP |
| **Printer** | Kopiert ein Enchantment-Buch (Buch + Liquid XP → 2 Bücher) |
| **Disenchanter** | Zieht Enchantments aus Items heraus → Liquid XP |
| **Mechanical Grindstone** | Automatisierter Schleifstein (Enchants entfernen) |

**Liquid Hyper Experience:**
- Herstellung: 100 mB Liquid XP + Mechanical Mixer → 10 mB Hyper XP
- Verhältnis: 10:1 — teuer, aber notwendig für Level > Vanilla-Cap
- Blaze Enchanter: 1 Buch + Hyper XP → Buch mit Level +1

---

### Baustein 2 — Enchantment Library Standalone

**Status**: ✓ NeoForge 1.21.1

**Funktion:**
- Bücher einlegen → werden in "Enchantment Points" umgewandelt
- Points abrufen → beliebiges Buch auf beliebigem gespeicherten Level extrahieren
- XP-Kosten beim Extrahieren (skaliert quadratisch mit Level)
- Direktes Disenchanting von Items möglich

**Steuerung:**
| Aktion | Tastenkombination |
|--------|------------------|
| 1 Level extrahieren | Linksklick |
| Max Level extrahieren | Shift + Linksklick |
| 1 Level zurückgeben | Ctrl + Linksklick |

**Rolle im System**: Das "Speicherkonto" für Enchantment-Fortschritt.

---

### Baustein 3 — Pneumaticraft Pressure Chamber

Aus `planning/quests/pneumaticraft-enchantment-path.md` — große Sprünge:
- **2.5 bar**: Level 10 → Level 25 (T1-Sprung)
- **6.0 bar**: Level 50 → Level 100 (T2-Sprung)

---

## Der vollständige Workflow

### Phase 1: Fundament (Level 1–10)

```
Apotheosis Enchanting Table (mit mehr Bookshelves)
        ↓
Buch Sharpness V (max Vanilla)
        ↓
Create EI: Blaze Forger + Liquid XP
  2× Sharpness V → Sharpness VI
  2× Sharpness VI → Sharpness VII
  ...
  → Sharpness X
        ↓
Enchantment Library: Sharpness X gespeichert ✓
```

*Automation hier einfach: Blaze Forger auf Fließband mit 2er-Bündeln, XP-Tank daneben.*

---

### Phase 2: Der große Sprung (Level 10 → 25)

```
Enchantment Library: Sharpness X abrufen
        ↓
Pneumaticraft Pressure Chamber (2.5 bar)
  + Mekanism Refined Obsidian (4×)
  + Apotheosis Normal Gem (2×)
        ↓
Sharpness XXV (1 Buch)
        ↓
Enchantment Library: Sharpness XXV gespeichert ✓
```

---

### Phase 3: Granulare Steigerung (Level 25–50)

```
Enchantment Library: Sharpness XXV abrufen
        ↓
Create EI: Printer + Liquid XP
  1× Sharpness XXV → 2× Sharpness XXV (Kopie)
        ↓
Create EI: Blaze Enchanter + Liquid Hyper XP
  2× Sharpness XXV → Sharpness XXVI
  (Apotheosis Level-Cap entfernt → funktioniert über Vanilla-Max)
        ↓
Enchantment Library: Sharpness XXVI speichern ✓
        ↓
Wiederholen bis Sharpness L (Level 50)
```

**XP-Bedarf pro Schritt wächst** → benötigt automatisierte XP-Farm:
- Industrial Foregoing: Mob Factory → XP-Drops
- Create EI Experience Hatch: Spieler-XP → Liquid XP
- Create EI Disenchanter: Alte Items → Liquid XP recyclen

---

### Phase 4: Endgame-Sprung (Level 50 → 100)

```
Enchantment Library: Sharpness L abrufen
        ↓
Pneumaticraft Pressure Chamber (6.0 bar)
  + AE2 Charged Certus Quartz (16×)
  + Apotheosis Mythic Gem (1×)
  + Mekanism Refined Glowstone Ingot (8×)
  + Create: Precision Mechanism (4×)
        ↓
Sharpness C (Level 100) — 1 Buch
        ↓
Create EI: Printer → kopieren
        ↓
Auf Netherite-Item anvilen (Blaze Forger)
```

---

## Automatisierungs-Pipeline (AE2 + Create EI)

```
[Mob Farm (IF)]
      ↓ XP-Drops
[Experience Hatch]
      ↓ Liquid XP
[Mechanical Mixer + Basin]
      ↓ Liquid Hyper XP (10:1)
[Fluid Tank (Create)]
      ↓
      ├──→ [Blaze Forger]    ← 2× Bücher vom AE2-Netz
      │         ↓ kombiniertes Buch
      └──→ [Blaze Enchanter] ← 1 Buch + Hyper XP
                ↓ Level+1 Buch
           [Enchantment Library] ← AE2 Pattern Provider steuert
                ↓ auf Anfrage
           [Printer]  ← erzeugt 2 Kopien
                ↓
           zurück zum Blaze Forger (Loop)
```

Mit AE2 Auto-Crafting kann man den Loop vollständig automatisieren:
- Pattern: `Sharpness(n) × 2 + Hyper XP → Sharpness(n+1)`
- Loop läuft durch bis Ziellevel erreicht

---

## XP-Generierung — Stack-Synergien

| Quelle | XP/min (ca.) | Gate |
|--------|-------------|------|
| Manuelle Mob-Kämpfe | Niedrig | Sofort |
| Iron's Spells Kämpfe | Mittel | Stufe 2 |
| Industrial Foregoing Mob Factory | Hoch | Stufe 3 |
| Mystical Agriculture XP Crops (via Agradditions) | Mittel-hoch | Stufe 3 |
| Apotheosis Dungeon-Bosse | Sehr hoch (Burst) | Stufe 4 |
| Disenchanter: Alte Items → Recycling | Variable | Ab Stufe 2 |

---

## KubeJS — Level-Cap Removal (Apotheosis Config)

Damit Blaze Forger / Blaze Enchanter über Level 5-10 hinaus funktioniert:

```javascript
// src/kubejs/startup_scripts/apotheosis_config.js
// Apotheosis Level-Caps per Enchantment deaktivieren
// (alternativ via apotheosis/enchanting.json Config-Datei)

// Die meisten Apotheosis-Caps werden via Config gesteuert:
// apotheosis-common.toml → evilcraft.enchantment_max_level = false
// Oder via KubeJS Enchantment-Registry-Event (1.21.1 API prüfen)
```

---

## Quest-Chapter: "Meister der Verzauberung"

1. **"Flüssige Erfahrung"** — Baue einen Experience Hatch
2. **"Der automatische Amboss"** — Blaze Forger in Betrieb nehmen
3. **"Bibliothek der Macht"** — Enchantment Library aufbauen
4. **"Sharpness X"** — Erste manuell kombinierte Enchantment Level 10
5. **"Der Sprung"** — Pressure Chamber: Level 25 in einem Schritt
6. **"Druckerei"** — Printer: Erstes Buch kopieren
7. **"Der Loop"** — Automatisierte Combining-Pipeline Level 25→50
8. **"Gottgleich"** — Erste Level 100 Enchantment
9. **"Das perfekte Schwert"** — Netherite-Schwert mit Sharpness 100 + weitere OP-Enchants

---

## Mod-Checkliste

| Mod | Rolle | Status |
|-----|-------|--------|
| Create: Enchantment Industry | Automation, Liquid XP, Printer, Blaze Forger/Enchanter | ✓ 1.21.1 |
| Enchantment Library Standalone | Speichern & Abrufen von Enchantment-Fortschritt | ✓ 1.21.1 |
| Apotheosis | Level-Cap-Removal, Basis-Enchanting T1-T2 | ✓ 1.21.1 |
| Pneumaticraft: Repressurized | Große Sprünge (Level 10→25, 50→100) | ✓ 1.21.1 |
| Industrial Foregoing | XP-Farm via Mob Factory | ✓ 1.21.1 |

---

## Offene Fragen

- [ ] Apotheosis Level-Cap-Config: Exakter Key für "remove all caps" verifizieren
- [ ] Blaze Forger akzeptiert Bücher über Level 5 ohne Config-Änderung?
- [ ] Enchantment Library: Kann sie mit AE2 ME-Interface interagieren (automatisiert befüllen/entleeren)?
- [ ] Liquid Hyper XP: Kann in Create Fluid Tanks gespeichert werden?
