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
TIER   MAX-LEVEL   UPGRADE-CAP   ERFOLGS-CHANCE     GATE
  1        30           V        100% (garantiert)  Apotheosis Holz/Stein Regale
  2        50          XI        100% (garantiert)  Blazing/Hellish Regale + Nether
  3        75         XVI        85% → 65%          Crystalline Regale + Osmium + Certus
  4       100          XXV       70% → 35%          Enderby Regale + Refined Obsidian + End
  5     Uncapped     Uncapped    60% → 25%  (Super) Create:EI Super Liquid XP
                                 99% → 90% (Mythic) Create:EI Mythic Liquid XP
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

### Upgrade-Caps und Erfolgswahrscheinlichkeiten

| Tier | Von → Bis | Erfolg | Bei Misserfolg | Methode |
|------|-----------|--------|----------------|---------|
| T1 | I → V | 100% | — | Apotheosis Table |
| T2 | V → XI | 100% | — | Apotheosis Amboss-Combine |
| T3 | XI → XVI | 85%→65% | Alle Inputs verloren | PNC 3.5 bar |
| T4 | XVI → XXV | 70%→35% | Alle Inputs verloren | PNC 5.5 bar |
| T5 (Super) | XXV → ∞ | 60%→25% | Alle Inputs verloren | Create:EI Super XP |
| T5 (Mythic) | XXV → ∞ | 99%→90% | Alle Inputs verloren | Create:EI Mythic XP |

**Misserfolg-Regel (ab T3):** Bei jedem Fehlversuch werden Buch, Materialien und XP vollständig
verbraucht. Das Enchantment-Level bleibt unverändert. Kein Teilrückgabe.

**Erfolg-Regel:** Immer genau +1 Level. Nie mehr.

> Die Caps gelten für **alle** Enchantments: Protection, Efficiency, Fortune etc.

### Wahrscheinlichkeits-Kurve im Detail

**T3 (PNC 3.5 bar)** — Einstieg ins Risiko:
| Upgrade | Erfolg |
|---------|--------|
| XI → XII | 85% |
| XII → XIII | 80% |
| XIII → XIV | 75% |
| XIV → XV | 70% |
| XV → XVI | 65% |

**T4 (PNC 5.5 bar)** — Echtes Risiko:
| Upgrade | Erfolg |
|---------|--------|
| XVI → XVII | 70% |
| XVII → XIX | 65% |
| XIX → XXI | 55% |
| XXI → XXIII | 45% |
| XXIII → XXV | 35% |

**T5 Super Liquid XP** — Hochrisiko, Ressourcen-Gate:
| Level-Bereich | Erfolg |
|---------------|--------|
| XXV – XXX | 60% |
| XXX – L | 50% |
| L – C | 40% |
| C – CC | 30% |
| CC+ | 25% (Floor) |

**T5 Mythic Liquid XP** — Nahezu garantiert, extreme Kosten:
| Level-Bereich | Erfolg |
|---------------|--------|
| XXV – L | 99% |
| L – C | 97% |
| C – CC | 95% |
| CC – D | 92% |
| D+ | 90% (Floor) |

### T1→T2 Upgrade: Apotheosis Amboss-Combine

Apotheosis entfernt die "Too Expensive"-Beschränkung. Damit ist beliebiges Kombinieren möglich:
```
Sharpness V (Buch) + Sharpness V (Buch) + Blazing Regal-Setup → Sharpness VI
Sharpness IX + Sharpness IX → Sharpness X (mit T2 Regalen)
Max bei T2: XI
```
Kostet XP (steigt linear mit dem Level). Mit Create:EI Liquid XP automatisierbar.

### T2→T3 Upgrade: Erste Pressure Chamber Nutzung (Risiko beginnt)

Ab T3 kann die Pressure Chamber Bücher direkt upgraden — **erstmals mit Verlustrisiko**:
```
Input:   Sharpness XI Buch + 2x Osmium Ingot + 1x Certus Crystal + 3.5 bar
Erfolg:  Sharpness XII Buch  (85%)
Fehler:  Alles verloren, Sharpness bleibt bei XI  (15%)
```
Mehrere Durchläufe bis XVI. Jedes Stufe senkt die Erfolgschance um ~5%.
PNC unterstützt native Wahrscheinlichkeits-Outputs — kein KubeJS-Workaround nötig.

### T3→T4 Upgrade: Pressure Chamber 5.5 bar (Risiko steigt)

```
Input:   Sharpness XVI Buch + 1x Refined Obsidian + 1x Fluix Crystal + 5.5 bar
Erfolg:  Sharpness XVII Buch  (70%)
Fehler:  Alles verloren, Sharpness bleibt bei XVI  (30%)
```
Von XVI bis XXV dauert es im Schnitt ~8-10 Versuche bei sinkender Erfolgsrate.
Refined Obsidian und Fluix Crystal sind die Hauptengpässe — beide teuer genug, dass
jeder Fehlversuch spürbar schmerzt.

### T4→T5: Create:EI Liquid XP — Drei Stufen, eine Entscheidung

Create: Enchantment Industry führt drei XP-Typen ein:

```
Liquid XP       — 1:1 aus XP-Kugeln/Mob-Farm (normales Liquid XP)
Super Liquid XP — 10.000 mB Liquid XP → 1.000 mB Super XP (Kompressor)
Mythic Liquid XP — 1.000.000 mB Liquid XP (≙ 1.000 mB Super XP) → 1 mB Mythic XP
```

#### Super Liquid XP — Hochrisiko, mittlere Kosten

```
Input:   Enchanted Book (Level N) + X mB Super Liquid XP
Erfolg:  Buch mit Level N+1  (60% bei Level XXV, sinkend bis 25% Floor)
Fehler:  Alles verloren — kein Level-Change  (restliche %)
```

Kosten-Skalierung (Super XP pro Versuch):
| Level | Super XP / Versuch | Ø Versuche bis Erfolg | Ø Super XP bis +1 Level |
|-------|--------------------|-----------------------|-------------------------|
| XXV → XXVI | 500 mB | ~1,7 | ~850 mB |
| L → LI | 2.000 mB | ~2,5 | ~5.000 mB |
| C → CI | 10.000 mB | ~4,0 | ~40.000 mB |
| CC → CCI | 50.000 mB | ~4,0 | ~200.000 mB |

#### Mythic Liquid XP — Nahezu garantiert, extreme Kosten

```
Input:   Enchanted Book (Level N) + Y mB Mythic Liquid XP
Erfolg:  Buch mit Level N+1  (99% bei Level XXV, min. 90% Floor)
Fehler:  Alles verloren  (1-10%)
```

Mythic XP ist 1000× konzentrierter als Super XP — eine Kompressor-Kette der höchsten
Create-Stufe (hohe RPM, mehrere Stufen) braucht Stunden für wenige mB Mythic XP.
Dafür sind Fehlversuche extrem selten. Für Spieler, die ein spezifisches Item auf
Level CC bringen wollen ohne 200 Fehlversuche zu riskieren.

**Produktion Mythic XP:**
```
[Mob Farm] → Liquid XP → [Super Compressor Stufe 1] → Super Liquid XP
Super Liquid XP → [Super Compressor Stufe 2, max RPM] → Mythic Liquid XP
```
~1 mB Mythic XP pro ~30 Minuten optimierter Anlage (Richtwert, nach Testing kalibrieren).

**KubeJS Implementation (T5 Chance-Mechanic):**
```javascript
// kubejs/server_scripts/enchanting_infusion.js
// Da Create:EI kein natives Chance-System hat, wird per KubeJS-Event eine
// Wahrscheinlichkeitsprüfung eingebaut
ItemEvents.rightClicked('apex:enchanting_infusion_altar', event => {
    const level = getEnchantLevel(event.item)
    const successChance = getSuperXPChance(level)  // 0.60 bis 0.25
    if (Math.random() < successChance) {
        upgradeEnchant(event.item)  // +1 Level
    }
    consumeInputs(event)  // immer: Inputs verbrauchen
})
```
> Exakte API nach Testing verifizieren — möglicherweise über Custom Block + KubeJS Block Events.

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
- **Super Liquid XP**: Jeder Level-Sprung kostet exponentiell mehr — mit 25%-60% Erfolg
- **Mythic Liquid XP**: 1000× konzentrierter, 90-99% Erfolgsrate — extreme Produktionskosten
- Apotheosis Unique Enchants (nur aus Boss-Loot, nicht craftbar)
- Create:EI Enchanting Infusion Altar: Hauptmechanik für unlimitiertes Upgraden

**Die Entscheidung ab T5:**
```
Viele billige Super-XP-Versuche    ──→  25-60% Erfolg, häufige Verluste
Wenige teure Mythic-XP-Versuche   ──→  90-99% Erfolg, extreme Produktionszeit
```
Beide Wege führen zum Ziel. Super XP ist schneller pro Versuch, Mythic XP sicherer pro
Level-Sprung. Wer eine effiziente Mob-Farm hat, bevorzugt Super XP. Wer ein einzelnes
Prestige-Item auf Level CCC bringen will, spart Mythic XP an.

**XP-Pipeline:**
```
Mob Farm → XP Drain → Liquid XP → Super Compressor 1 → Super Liquid XP
                                   Super Compressor 2 → Mythic Liquid XP
                                   (max RPM, Create Tier 3+ erforderlich)
```

**Quest:** "Der Endlos-Aufstieg" (nach allen 4 Cataclysm-Bossen) → Mythic Gem Socketing-Werkbank freigeschaltet + Enchanting Infusion Altar Schematic

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

## Zusammenfassung — Macht-Kurve & Risiko

```
Tier   Level-Cap   Erfolg    Ressourcen-Verlust möglich?
  1         V      100%      Nein
  2        XI      100%      Nein
  3       XVI      65-85%    Ja — Osmium + Certus
  4       XXV      35-70%    Ja — Refined Obsidian + Fluix Crystal
  5 (S)    ∞       25-60%    Ja — Super Liquid XP (viel)
  5 (M)    ∞       90-99%    Ja — Mythic Liquid XP (wenig, aber extrem teuer)
```

**Der zentrale Design-Gedanke:** T1 und T2 sind frustrationsfrei. Erst ab T3 wird
Enchanting zu einem System mit echten Entscheidungen: Wann ist das Risiko es wert?
Möchte ich lieber viele billige Versuche mit Super XP, oder spare ich für Mythic XP?

Es gibt kein Hard-Cap. Ein Spieler mit maximaler Automatisierung kann Sharpness 100+
erreichen — aber jeder Level über 50 ist ein bewusstes Investment, kein Selbstläufer.
Das fühlt sich verdient an, nicht gegrinded.
