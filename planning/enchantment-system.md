# Enchantment-System — Gaia Awakening

> **Status**: Planungsdokument — 2026-05-01
> **Mods**: Apotheosis 8.5.2, Pneumaticraft: Repressurized, Create: Enchantment Industry

---

## Designprinzip

Enchanting hat zwei Dimensionen:
- **Tier-Freischaltung** (Bookshelves): Schaltet das Maximum eines Tiers frei — einmalig, materialintensiv
- **Enchantment-Upgrade** (Kombinieren): Bringt existierende Verzauberungen immer höher — iterativ, ressourcenintensiv

Beides ist eng verzahnt: Höhere Tier-Freischaltung ist Voraussetzung für höhere Upgrade-Outputs.
Das absolute Endgame-Limit ist keine Zahl, sondern die verfügbaren Ressourcen — primär
**Super Liquid XP** aus Create: Enchantment Industry.

---

## Tier-Übersicht

```
TIER   MAX-LEVEL   UPGRADE-CAP   GATE
  1        30           V        Apotheosis Holz/Stein Regale
  2        50          XI        Blazing/Hellish Regale + Nether
  3        75         XVI        Crystalline Regale + Osmium + Certus
  4       100          XXV       Enderby Regale + Refined Obsidian + End
  5     Uncapped     Uncapped    Create:EI Super Liquid XP (nur Ressourcen-Gate)
```

---

## Enchantment-Upgrade-Pfad

### Das Prinzip

Jeder Tier erlaubt es, bestehende Items aufzurüsten — nicht nur neu zu verzaubern.
Das Apotheosis-Amboss-System erlaubt das Kombinieren gleicher Verzauberungen:
`Sharpness V + Sharpness V → Sharpness VI` (mit passenden Tier-Regalen).

Die Pneumaticraft Pressure Chamber übernimmt ab T3 als Upgrade-Maschine:
Input: Enchanted Book (niedriger Level) + Druck + Materialien → Output: höheres Level.

Create: Enchantment Industry liefert ab T5 unendlich Super Liquid XP als einzige Schranke.

### Upgrade-Caps pro Tier

| Tier | Sharpness-Beispiel | Methode | Ressourcen |
|------|--------------------|---------|------------|
| T1 | I → V | Apotheosis Table + Standard-Regale | Lapis, XP |
| T2 | V → XI | Apotheosis Table + Blazing Regale, Amboss-Combine | Blaze Rod, XP |
| T3 | XI → XVI | PNC Pressure Chamber (3.5 bar) | Osmium, Certus, Druck-Gas |
| T4 | XVI → XXV | PNC Pressure Chamber (5.5 bar) | Refined Obsidian, Fluix Crystal |
| T5 | XXV → ∞ | Create:EI Enchanting Infusion + Super Liquid XP | Super Liquid XP (beliebig viel) |

> Die Caps gelten für **alle** Enchantments, nicht nur Sharpness. Protection, Efficiency,
> Fortune etc. folgen demselben Schema.

### T1→T2 Upgrade: Apotheosis Amboss-Combine

Apotheosis entfernt die "Too Expensive"-Beschränkung. Damit ist beliebiges Kombinieren möglich:
```
Sharpness V (Buch) + Sharpness V (Buch) + Blazing Regal-Setup → Sharpness VI
Sharpness IX + Sharpness IX → Sharpness X (mit T2 Regalen)
Max bei T2: XI
```
Kostet XP (steigt linear mit dem Level). Mit Create:EI Liquid XP automatisierbar.

### T2→T3 Upgrade: Erste Pressure Chamber Nutzung

Ab T3 kann die Pressure Chamber Bücher direkt upgraden:
```
Input:  Sharpness XI Buch + 2x Osmium Ingot + 1x Certus Crystal + 3.5 bar
Output: Sharpness XIII Buch
```
Mehrere Durchläufe bis XVI. Kosten pro Level-Sprung steigen mit dem Level.

### T3→T4 Upgrade: Pressure Chamber 5.5 bar

```
Input:  Sharpness XVI Buch + 1x Refined Obsidian + 1x Fluix Crystal + 5.5 bar
Output: Sharpness XIX Buch
```
Bis XXV möglich. Refined Obsidian ist der Haupt-Engpass (teuer in Mekanism).

### T4→T5: Create:EI Super Liquid XP — Das Endgame-Gate

Create: Enchantment Industry führt **Liquid Experience** ein:
- Normales Liquid XP: Aus XP-Kugeln, Mob-Farmen, Spieler-XP via XP Drain
- **Super Liquid XP**: Komprimiertes Liquid XP (10.000 mB normales XP → 1.000 mB Super XP)
  erfordert Create-Kompressor-Setup

Ab T5 funktioniert das Upgraden so:
```
Input:  Beliebiges Enchanted Book (beliebiger Level) + X mB Super Liquid XP
Output: +1 Level auf diese Verzauberung

Je höher das aktuelle Level, desto mehr Super Liquid XP pro Level-Sprung nötig.
Level 25 → 26:   500 mB Super XP
Level 50 → 51:   2.000 mB Super XP
Level 100 → 101: 10.000 mB Super XP
```

Das einzige Limit ist der Durchsatz der Super-XP-Produktion. Eine große Mob-Farm +
Create:EI XP-Kompressor-Kette kann stundenlang Super XP produzieren und erlaubt so
theortisch unbegrenzt hohe Enchantments — aber jeder Level kostet mehr als der vorherige.

---

## Tier 1 — Vanilla+ (Sofort, Stunden 0-5)

**Enchanting-Table-Maximum**: Level 30 | **Upgrade-Cap**: Sharpness V

**Verfügbare Mechaniken:**
- Standard Apotheosis Enchanting Table
- Apotheosis Holz- und Stein-Regale (bessere Enchanting Power als Vanilla)
- Erste Apotheosis-Unique-Enchants: Scavenger, Lifemend
- Common & Uncommon Gems aus Höhlen-Truhen
- Apotheosis Amboss: "Too Expensive" entfernt

**Regale (15 Stück für T1-Maximum):**
- Apotheosis Typeset Bookshelves (Bücher + Tinte)

**Quest:** "Dein erster verbesserter Zaubertisch" → Belohnung: Apotheosis Typeset Book x5, Common Gem x2

---

## Tier 2 — Nether-Infused (Stunden 5-15)

**Enchanting-Table-Maximum**: Level 50 | **Upgrade-Cap**: Sharpness XI

**Gate:** Nether-Zugang + Create T2 (Blaze Burner für Blaze-Rod-Automatisierung)

**Neue Mechaniken:**
- Apotheosis Blazing Regale (Blaze Rods + Netherrack) — **neue Enchantment Power Quelle**
- Apotheosis Hellish Regale (Nether Bricks + Soul Sand + Gold)
- Amboss-Combine bis Sharpness XI möglich (benötigt T2-Regale aktiv)
- Apotheosis Smithing Templates in Nether-Strukturen (verbesserte Rüstungs-Upgrades)
- Uncommon & Rare Gems in Nether-Festungen und YUNG's Dungeons

**Regale für T2 (8 Blazing + 4 Hellish):**
- Blazing Bookshelf: Blaze Rod + Nether Brick + Apotheosis Typeset Book
- Hellish Bookshelf: Nether Brick Block + Gold Block + Soul Sand

**Balancing:** Create Blaze Burner treibt Blaze-Rod-Produktion — ohne Create ist T2 sehr teuer.
Das ist Absicht: Create-Adoption wird durch den Enchanting-Anreiz gefördert.

**Quest:** "Nether-Magie: Zähme die Glut" → Belohnung: Blazing Bookshelf x4, Rare Gem x1

---

## Tier 3 — Crystalline (Stunden 15-30)

**Enchanting-Table-Maximum**: Level 75 | **Upgrade-Cap**: Sharpness XVI

**Gate:** Mekanism T1 (Osmium) + AE2 Entry (Certus Quartz) + PNC Einstieg (3.5 bar)

**Neue Mechaniken:**
- Apotheosis Crystalline Regale (Osmium + Certus) — höchste Enchanting Power im normalen Spiel
- **Gem Socketing freigeschaltet** (Common & Uncommon Gems in Ausrüstung)
- **PNC Pressure Chamber Enchanting**: Input-Book upgraden bis XVI
- Apotheosis Gem-Fusion: 3x gleiche Gems → 1x nächste Seltenheit

**Regale für T3 (8 Crystalline):**
- Crystalline Bookshelf: Mekanism Osmium Ingot + AE2 Certus Crystal + Apotheosis Typeset Book

**PNC Pressure Chamber Rezept (KubeJS):**
```javascript
// kubejs/server_scripts/pneumaticraft_enchanting.js
PneumaticCraftEvents.pressureChamber(event => {
    // Sharpness XI → XIII (3.5 bar)
    event.addRecipe({
        id: 'apex:pc_enchant_upgrade_t3',
        inputs: [
            '1x apotheosis:enchanted_book{Enchantments:[{id:"minecraft:sharpness",lvl:11}]}',
            '2x mekanism:ingot_osmium',
            '1x ae2:certus_quartz_crystal'
        ],
        outputs: ['1x apotheosis:enchanted_book{Enchantments:[{id:"minecraft:sharpness",lvl:13}]}'],
        pressure: 3.5
    })
})
```
> Exakte PNC KubeJS API nach Testing verifizieren.

**Quest:** "Kristallisierte Magie" → Belohnung: Crystalline Bookshelf x4, Rare Gem x3, PNC Pressure Tube Kit

---

## Tier 4 — Enderby Elite (Stunden 30-50)

**Enchanting-Table-Maximum**: Level 100 | **Upgrade-Cap**: Sharpness XXV

**Gate:** End-Zugang + Mekanism Refined Obsidian + PNC 5.5 bar

**Neue Mechaniken:**
- Apotheosis Enderby Regale (Refined Obsidian + End Stone + Ender Pearl)
- **Gem Socketing: Rare & Epic Gems** freigeschaltet
- PNC 5.5 bar Upgrade: Level XVI → XXV in mehreren Läufen
- Create:EI Liquid XP: Erste XP-Automatisierung möglich (normales Liquid XP)

**Regale für T4 (8 Enderby):**
- Enderby Bookshelf: Mekanism Refined Obsidian Ingot + End Stone Bricks + Ender Pearl + Apotheosis Typeset Book

**PNC 5.5 bar Upgrade:**
```
Input:  Sharpness XVI Buch + Refined Obsidian + Fluix Crystal + 5.5 bar
Output: Sharpness XIX Buch
(3 Durchläufe bis XXV)
```

**Quest:** "Jenseits der Sterne" → Belohnung: Enderby Bookshelf x4, Epic Gem x2, End Portal Kompass

---

## Tier 5 — Legendary / Uncapped (Stunden 50+)

**Enchanting-Table-Maximum**: Uncapped | **Upgrade-Cap**: Nur Ressourcen

**Gate:** Cataclysm-Bosse besiegt + Create:EI Super Liquid XP Produktion aufgebaut

**Neue Mechaniken:**
- **Mythic Gem Socketing** (stärkste passive Boni im Spiel)
- **Super Liquid XP Gate**: Jeder Level-Sprung über XXV kostet exponentiell mehr Super XP
- Apotheosis Unique Enchants (nur aus Boss-Loot, nicht craftbar)
- Create:EI Enchanting Infusion Altar: Hauptmechanik für unlimitiertes Upgraden

**Super Liquid XP Produktion:**
```
Mob Farm → XP Kugeln → Create:EI XP Drain → Liquid XP Tank
Liquid XP Tank → Create:EI Compressor (Rotationsenergie) → Super Liquid XP Tank
Super Liquid XP → Enchanting Infusion Altar → Beliebiges Book +1 Level
```

**Kosten-Skalierung (exponentiell):**
| Von → Nach | Super Liquid XP |
|-----------|-----------------|
| XXV → XXVI | 500 mB |
| L → LI | 2.000 mB |
| C → CI | 10.000 mB |
| CC → CCI | 50.000 mB |

Eine optimierte XP-Farm + Create:EI Kompressor produziert ~5.000-10.000 mB Super XP/h.
Damit sind praktisch Level 50-75 das realistische Maximum für normale Spieler.
Hardcore-Automatisierer können darüber hinaus gehen — das ist der Prestige-Aspekt.

**Quest:** "Der Endlos-Aufstieg" (nach allen 4 Cataclysm-Bossen) → Belohnung: Mythic Gem Socketing-Werkbank freigeschaltet

---

## Gem-System — Vollständige Übersicht

| Seltenheit | Quelle | Socketing ab | Bonus-Beispiel |
|------------|--------|-------------|----------------|
| Common | Alle Höhlen-Truhen | T3 | +5% Damage |
| Uncommon | YUNG's Dungeons | T3 | +10% Defense |
| Rare | When Dungeons Arise | T3-T4 | +15% Speed |
| Epic | Apotheosis-Bosse, Cataclysm Entry | T4 | +25% Crit Chance |
| Mythic | Cataclysm-Endbosse, PNC 7.5 bar | T5 | +40% Damage + Spezialeffekt |

**Gem-Fundorte Config (Apotheosis + Loot Tables):**
- Common/Uncommon: Vanilla Dungeons + YUNG's → unangetastet
- Rare: **Nur** When Dungeons Arise + YUNG's Better Strongholds
- Epic: **Nur** Apotheosis-Boss-Loot + Cataclysm Entry-Dungeons
- Mythic: **Ausschließlich** Cataclysm-Endbosse + PNC Pressure Chamber 7.5 bar

---

## Apotheosis Config-Plan

```toml
# config/apotheosis/enchanting.toml (nach erstem Start generiert, dann anpassen)

[general]
    removeEnchantingCap = true      # Level-Cap entfernen für T4/T5
    maxEnchantingPower = 200        # Erhöht für Crystalline/Enderby Regale

[gems]
    epicGemsInBasicLoot = false     # Epic Gems nur Boss-Drops
    mythicGemsInBasicLoot = false   # Mythic Gems nur Cataclysm
```

---

## Create:EI Integration — Liquid XP Pipeline

```
[Mob Farm]           → XP Kugeln auf Boden
[Deployer]           → Aufsammeln
[XP Drain (EI)]      → Liquid XP (mB)
[Fluid Pipe]         → Tank
[XP Compressor (EI)] → 10x Liquid XP → 1x Super Liquid XP
[Super XP Tank]      → Enchanting Infusion Altar (T5)
```

Die XP Drain und Compressor-Mengen-Verhältnisse nach Testing kalibrieren.
Ziel: Sharpness 50 sollte ~10-15h aktiver Mob-Farm-Laufzeit kosten.

---

## Zusammenfassung — Macht-Kurve

```
Sharpness  V  ████░░░░░░░░  T1 — Vanilla, unangetastet
Sharpness XI  ██████░░░░░░  T2 — Nether + Create T2 Blaze
Sharpness XVI ████████░░░░  T3 — Mekanism + AE2 + PNC 3.5 bar
Sharpness XXV ██████████░░  T4 — End + Refined Obsidian + PNC 5.5 bar
Sharpness ∞   ████████████  T5 — Super Liquid XP, nur Ressourcen-Gate
```

Der wichtigste Design-Gedanke: Es gibt **kein Hard-Cap im Endgame**. Spieler die
massiv automatisieren können sich Sharpness 100+ verdienen. Das fühlt sich verdient
an, nicht gegrinded — weil die Automatisierung selbst das Spiel ist.
