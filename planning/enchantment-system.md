# Enchantment-System — Gaia Awakening

> **Status**: Planungsdokument — 2026-05-01
> **Mods**: Apotheosis 8.5.2, Pneumaticraft: Repressurized

---

## Designprinzip

Enchanting ist der vertikale Macht-Vektor des Modpacks. Jeder Tier-Sprung
erfordert Materialien aus dem *nächsten* Tech-Zweig, d.h. stärkere Verzauberungen
sind immer eine Brücke zwischen dem aktuellen und dem nächsten Progression-Tier.

```
                POWER                GATE
    ┌─────────┐
    │ Tier 1  │ ──── Max Lvl  30 ──── Apotheosis-Regale (Holz/Stein)
    └────┬────┘
         │ Nether-Zugang + Create T2
    ┌────▼────┐
    │ Tier 2  │ ──── Max Lvl  50 ──── Blazing / Hellish Regale (Blaze + Quartz)
    └────┬────┘
         │ Mekanism T1 + AE2 Entry
    ┌────▼────┐
    │ Tier 3  │ ──── Max Lvl  75 ──── Crystalline Regale (Osmium + Certus)
    └────┬────┘
         │ Pneumaticraft 3.5 bar
    ┌────▼────┐
    │ Tier 4  │ ──── Max Lvl 100 ──── Enderby Regale (Refined Obsidian + End)
    └────┬────┘
         │ Cataclysm-Bosse besiegt (Mythic Gems)
    ┌────▼────┐
    │ Tier 5  │ ──── Uncapped ─────── Gem Socketing (Mythic) + Apotheosis Unique
    └─────────┘
```

---

## Tier 1 — Vanilla+ (Sofort, Stunden 0-5)

**Max Enchantment Level**: 30

**Verfügbare Mechaniken:**
- Standard Apotheosis Enchanting Table
- Vanilla Bookshelves ersetzen durch Apotheosis Holz-Regale (bonus enchanting power)
- Erste Apotheosis-Unique-Enchants freigeschaltet (Scavenger, Lifemend)
- Common & Uncommon Gems aus normalen Höhlen-Truhen

**Materialien für Regale:**
- Standard Bookshelves (15 Stück für Max Tier 1)
- Apotheosis Typeset Books (Crafting aus Büchern + Tinte)

**Lore:** Die Magie der Welt ist erwacht, aber noch ungezähmt. Einfache Verzauberungen
fühlen sich bereits stärker an als in einer normalen Welt.

**Quest:** "Dein erster verbesserter Zaubertisch" → Belohnung: Apotheosis Typeset Book x5

---

## Tier 2 — Nether-Infused (Stunden 5-15)

**Max Enchantment Level**: 50

**Gate:** Nether-Zugang + Create T2 (Blaze Burner für Blaze-Rods-Automatisierung)

**Neue Mechaniken:**
- Apotheosis Blazing Regale (Blaze Rods + Netherrack)
- Apotheosis Hellish Regale (Nether Bricks + Gold)
- Schmiedevorlage-System: Apotheosis Smithing Templates in Nether-Strukturen
- Uncommon & Rare Gems jetzt in Nether-Festungen und verbesserten YUNG's Dungeons
- Anvil Improvements: Apotheosis entfernt die "Too Expensive"-Beschränkung

**Materialien für T2-Regale:**
- 8x Blazing Bookshelf (je: Blaze Rod + Nether Brick + Apotheosis Typeset Book)
- 4x Hellish Bookshelf (je: Nether Bricks + Gold Block + Soul Sand)

**Balancing-Gate:** Create Blaze Burner ist Voraussetzung für effiziente Blaze-Rod-Produktion.
Ohne Create ist Tier 2 frustrierend teuer (Absicht — treibt Create-Adoption an).

**Quest:** "Nether-Magie: Zähme die Glut" → Belohnung: Rare Gem + Nether Kompass

---

## Tier 3 — Crystalline (Stunden 15-30)

**Max Enchantment Level**: 75

**Gate:** Mekanism T1 (funktionierender Osmium-Abbau) + AE2 Entry (Certus Quartz)

**Neue Mechaniken:**
- Apotheosis Crystalline Regale (Osmium + Certus Quartz)
- Gem Socketing freigeschaltet (ab Common Gems)
- Apotheosis Gem-Fusion: 3x gleiche Gems → 1x nächste Seltenheit
- Unique Enchants: Vorpal, Leech, Reach

**Materialien für T3-Regale:**
- 8x Crystalline Bookshelf (je: Mekanism Osmium Ingot + AE2 Certus Crystal + Apotheosis Typeset Book)

**KubeJS Custom-Rezept:**
```javascript
// Gem-Socketing-Freischaltung: Apotheosis Vial of Expungement
ServerEvents.recipes(event => {
    event.shaped('apotheosis:vial_of_expungement', [
        ' O ',
        'OCO',
        ' O '
    ], {
        O: 'mekanism:ingot_osmium',
        C: 'ae2:certus_quartz_crystal'
    })
})
```

**Pneumaticraft Synergy:** Erste Pressure-Chamber-Enchants (T3 Enchanted Books) bei 3.5 bar.
Die Pressure Chamber kann Books auf Level 25+ bringen, was der normale Tisch nicht kann.

**Quest:** "Kristallisierte Magie" → Belohnung: Crystalline Bookshelf x4 + Rare Gem x3

---

## Tier 4 — Enderby Elite (Stunden 30-50)

**Max Enchantment Level**: 100

**Gate:** Pneumaticraft 5.5 bar + End-Zugang (Shulker-Shell + Elytra) + Mekanism Refined Obsidian

**Neue Mechaniken:**
- Apotheosis Enderby Regale (Refined Obsidian + End-Materialien)
- Apotheosis Boss-Helme droppen Epic Gems (Apotheosis-Ritter-Bosse)
- Gem Socketing für Epic Gems freigeschaltet
- Max-Level-Enchants: Protection X, Sharpness X, etc.

**Materialien für T4-Regale:**
- 8x Enderby Bookshelf (je: Mekanism Refined Obsidian Ingot + Ender Pearl + End Stone + Apotheosis Typeset Book)

**Pneumaticraft Pressure Chamber T4:**
- 5.5 bar Input: T3 Enchanted Book → T4 Enchanted Book (Level 50+)
- Materialien: Compressed Iron + AE2 Fluix Crystal + Apotheosis Epic Gem

**Quest:** "Jenseits der Sterne" → Belohnung: End Portal Kompass + Epic Gem x2

---

## Tier 5 — Legendary (Stunden 50+, Endgame)

**Max Enchantment Level**: Uncapped (Apotheosis Mechanic)

**Gate:** Cataclysm-Bosse besiegt (Ignis, Ender Guardian, Ancient Remnant) → Mythic Gems droppen

**Mechaniken:**
- **Mythic Gem Socketing**: Die stärksten passiven Boni im Spiel
- **Apotheosis Unique Enchants**: Nur aus Apotheosis-Boss-Loot (nicht craftbar)
- **Pneumaticraft 7.5 bar**: Input: Epic Gem → Mythic Gem (alternativ zu Boss-Drops)
- **Enchantment "God Roll"**: Apotheosis erlaubt multiple Enchants desselben Typs

**Mythic Gem Effekte (Apotheosis 8.5.2):**
- Mythic Slash Gem: +40% Damage
- Mythic Barbed Gem: Thorns + Counter-Damage
- Mythic Arcane Gem: Spell-Amplification für Iron's Spells

**Quest-Gate:** "Der Endlos-Aufstieg" — Questchain erfordert alle 4 Cataclysm-Bosse besiegt.
Nur dann wird die Mythic-Socketing-Werkbank in der Quest-Belohnung freigeschaltet.

---

## Apotheosis Gem-System — Vollständige Übersicht

| Seltenheit | Quelle | Socket-Tier | Bonus-Beispiel |
|------------|--------|-------------|----------------|
| Common | Alle Höhlen-Truhen | T3 | +5% Damage |
| Uncommon | YUNG's Dungeons | T3 | +10% Defense |
| Rare | When Dungeons Arise | T3-T4 | +15% Speed |
| Epic | Apotheosis Bosse, Cataclysm Entry | T4 | +25% Crit Chance |
| Mythic | Cataclysm-Endbosse, PNC 7.5 bar | T5 | +40% Damage + Spezialeffekt |

### Gem-Fundorte anpassen (Apotheosis Config + Loot Tables)
- Common/Uncommon: Vanilla Dungeons + YUNG's → unangetastet
- Rare: **Nur** in When Dungeons Arise + YUNG's Better Strongholds
- Epic: **Nur** Apotheosis-Boss-Loot und Cataclysm-Dungeons
- Mythic: **Ausschließlich** Cataclysm-Endbosse + PNC Pressure Chamber 7.5 bar

---

## Apotheosis Enchanting — Config-Plan

```toml
# config/apotheosis/enchanting.toml (nach erstem Spielstart generiert)

[general]
    # Level-Cap entfernen (für T4/T5 Enchants)
    removeEnchantingCap = true

[table]
    # Normaler Enchanting Table: Max Apotheosis-Shelving-Power für T1-T2
    # Crystalline/Enderby-Regale erhöhen die Power über das Standard-Maximum
    maxEnchantingPower = 150  # Standard ~100, erhöht für T3+ Regale

[gems]
    # Epic Gems nicht in normalen Loot Tables (nur Boss-Drops)
    epicGemsInBasicLoot = false
    # Mythic Gems nicht generisch (nur Cataclysm)
    mythicGemsInBasicLoot = false
```

> **Hinweis**: Tatsächliche Config-Keys nach erstem Spielstart verifizieren — Apotheosis 8.5.2
> generiert die Datei mit Kommentaren, dann anpassen.

---

## Pneumaticraft Pressure Chamber — Enchanting-Gate

| Druck | Enchanting-Tier | Beispiel-Output | Materialkosten |
|-------|----------------|-----------------|----------------|
| 3.5 bar | T3 Entry | Level 25 Books | Osmium + Certus |
| 5.5 bar | T4 Entry | Level 50 Books + Gem-Upgrade | Refined Obsidian + Fluix |
| 7.5 bar | T5 Entry | Mythic Gem Crafting | Komplettes T5-Material-Setup |

Pressure Chamber Rezepte werden via **KubeJS + PNC API** definiert.
Datei: `kubejs/server_scripts/pneumaticraft_chamber_enchanting.js`

---

## Zusammenfassung — Macht-Kurve

```
Level 30  ████░░░░░░  T1 — Einstieg, unangetastet
Level 50  ██████░░░░  T2 — Nether required
Level 75  ████████░░  T3 — Mekanism + AE2 required
Level 100 ██████████  T4 — End + PNC + Refined Obsidian required
Uncapped  ██████████+ T5 — Cataclysm endgame only
```

Der Machtsprung zwischen den Tiers ist bewusst nicht linear:
T1→T2 ist sanft (motiviert Erkundung), T4→T5 ist ein harter Sprung (Endgame-Prestige).
