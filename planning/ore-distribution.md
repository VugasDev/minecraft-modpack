# Erzverteilung — Gaia Awakening

> **Status**: Planungsdokument — 2026-05-01
> **Implementierung**: KubeJS Datapack-Overrides in `kubejs/data/`

---

## Designprinzip

Jede Tiefenzone korrespondiert mit einer Progression-Stufe. Ein Spieler in Stufe 2
findet automatisch die richtigen Ressourcen, wenn er "tiefer gräbt als bisher".
Keine künstlichen Locks nötig — die Weltgeografie erzählt die Geschichte.

```
Y +512  ┌─────────────────────────────────┐
        │   Berggipfel / Tectonic Peaks   │  Keine Erze — Exploration Reward
Y +192  ├─────────────────────────────────┤
        │   Oberfläche & Hügel            │  T1: Coal, Iron, Copper, Zinc oben
Y   +64 ├─────────────────────────────────┤
        │   Normale Höhlen                │  T2: Zinc (Create), Gold, Lapis
Y    0  ├═════════════════════════════════╡  ← Sea Level
        │   Tiefe Höhlen                  │  T3: Osmium (Mekanism), Certus (AE2)
Y   -48 ├─────────────────────────────────┤
        │   Abyss                         │  T4: Uranium, Lead, Fluorite
Y   -96 ├─────────────────────────────────┤
        │   Void-Schicht                  │  T5: Ancient Debris + Osmium peak
Y  -128 └─────────────────────────────────┘  ← Bedrock
```

---

## Zone 1 — Oberfläche & Hügel (Y +64 bis +192)

**Progression Tier 1 — Sofort zugänglich**

| Erz | Typ | Y-Min | Y-Max | Vein-Größe | Vein/Chunk | Notizen |
|-----|-----|-------|-------|------------|------------|---------|
| Coal | Vanilla | 0 | 192 | 17 | 30 | Standard, unangetastet |
| Iron | Vanilla | -64 | 320 | 9 | 10 | Häufiger in Hügeln |
| Copper | Vanilla | -16 | 112 | 10 | 16 | Peak bei Y +48 |
| Zinc (Create) | Create | 10 | 85 | 9 | 8 | Obere Hälfte, early T2 |

**Kein Eingriff nötig** — Vanilla-Generierung passt für T1. Zinc liegt ohnehin in diesem Bereich.

---

## Zone 2 — Normale Höhlen (Y -32 bis +64)

**Progression Tier 2 — Create & Erkundung**

| Erz | Typ | Y-Min | Y-Max | Vein-Größe | Vein/Chunk | Notizen |
|-----|-----|-------|-------|------------|------------|---------|
| Gold | Vanilla | -64 | 32 | 9 | 4 | Angepasst, mehr im Peak -16 bis 0 |
| Lapis | Vanilla | -64 | 64 | 7 | 2 | Unangetastet |
| Redstone | Vanilla | -64 | 15 | 8 | 8 | Unangetastet |
| Diamond | Vanilla | -64 | 16 | 8 | 1 | Tiefer verlagert (s. Zone 3) |
| Ars Nouveau: Source Gem | Ars | -20 | 40 | 5 | 4 | Moderate Zugänglichkeit |
| AE2: Certus (obere Schicht) | AE2 | -20 | 30 | 4 | 2 | Einstieg AE2, erfordert Erkundung |

**Anpassungen:**
- Diamond-Peak von Y -58 auf Y -48 verlagern (etwas tiefer → T2/T3-Grenze)
- Gold-Peak bei Y -10 konzentrieren (Cave-Layer Motivation)

---

## Zone 3 — Tiefe Höhlen (Y -48 bis 0)

**Progression Tier 3 — Mekanism & AE2 Entry**

| Erz | Typ | Y-Min | Y-Max | Vein-Größe | Vein/Chunk | Notizen |
|-----|-----|-------|-------|------------|------------|---------|
| Osmium (Mekanism) | Mekanism | -48 | 16 | 8 | 6 | **Kern-Gate für Mekanism** |
| Tin (Mekanism) | Mekanism | -32 | 20 | 7 | 5 | Bronze-Alloys |
| Certus Quartz (AE2) | AE2 | -48 | 0 | 5 | 3 | Peak bei -24, gated hinter echtem Caving |
| Diamond (verlagert) | Vanilla | -64 | -20 | 8 | 1 | Tiefer als Vanilla, mehr Reward |

**Kerndesign:** Osmium startet bei Y -48, nicht tiefer. Spieler müssen in echte Tiefen-Höhlen, aber nicht in die Abyss. Der Übergang von T2→T3 ist das erste Mal, dass sie wirklich tief gehen müssen.

---

## Zone 4 — Abyss (Y -96 bis -48)

**Progression Tier 4 — Mekanism Advanced, PNC Late**

| Erz | Typ | Y-Min | Y-Max | Vein-Größe | Vein/Chunk | Notizen |
|-----|-----|-------|-------|------------|------------|---------|
| Uranium (Mekanism) | Mekanism | -96 | -48 | 6 | 2 | **Selten und gefährlich** |
| Lead (Mekanism) | Mekanism | -96 | -32 | 8 | 4 | Radiation-Shielding |
| Fluorite (Mekanism) | Mekanism | -80 | -32 | 7 | 3 | Chemicals, Infused Crystal |
| Osmium (Peak) | Mekanism | -80 | -48 | 10 | 4 | Höhere Konzentration für spätes T3 |

**Gefahren-Design:** Diese Zone ist bewusst ungemütlich. Ancient-Deepslate-Textur, kaum Beleuchtung, aggressive Mobs (Sculk durch Sculk-Veins, Warden-Trigger in Deepslate-Kammern).

---

## Zone 5 — Void-Schicht (Y -128 bis -96)

**Progression Tier 5 — Endgame**

| Erz | Typ | Y-Min | Y-Max | Vein-Größe | Vein/Chunk | Notizen |
|-----|-----|-------|-------|------------|------------|---------|
| Ancient Debris | Vanilla/Nether | -128 | -96 | 3 | 0.5 | **Sehr selten**, nur für Endgame-Schmiede |
| Osmium (Abyss-Cluster) | Mekanism | -128 | -80 | 12 | 2 | Große Cluster für Lategame-Massenproduktion |
| Uranium (Abyss) | Mekanism | -128 | -96 | 5 | 1 | Maximale Seltenheit |

**Lore-Design:** Die tiefste Schicht soll sich wie eine uralte, unberührte Welt anfühlen. Bedrock bei Y -128. Keine künstliche Lichtemission. Quest-Chapter "Beneath the Roots" als Belohnung für das erste Erreichen.

---

## Nether-Erze (unverändert)

Alle Nether-Materialien bleiben vanilla-standard:
- Nether-Quartz, Gold (Gilded/Standard), Ancient Debris
- Mekanism Nether-Ores bleiben deaktiviert (zu OP für T3-Bypass)

---

## Implementierung

### Methode
Mekanism 10.7.x und AE2 19.x verwenden **Datapack-basierte Weltgenerierung**.
Overrides in `kubejs/data/<namespace>/worldgen/placed_feature/<ore_name>.json`.

### Priorität der Änderungen

| Priorität | Erz | Grund |
|-----------|-----|-------|
| **Kritisch** | Osmium (Mekanism) | Gate für T3, muss tiefer als vanilla |
| **Kritisch** | Uranium | Gate für T4, muss sehr selten und tief sein |
| **Hoch** | Diamond | Tiefer verlagern, mehr Spannung |
| **Hoch** | Certus (AE2) | AE2-Einstieg an T2/T3-Grenze |
| **Mittel** | Gold | Peak nach unten verlagern |
| **Niedrig** | Coal, Iron, Copper | Vanilla passt |

### Nächste Schritte
1. Prüfen welche Mekanism-Ores tatsächlich Datapack-Override unterstützen
2. `kubejs/data/mekanism/worldgen/placed_feature/` für Osmium/Uranium/Lead erstellen
3. `kubejs/data/minecraft/worldgen/placed_feature/` für Diamond-Verlagerung
4. In-Game verifizieren mit F3 + aktueller Y-Koordinate und `/locate`

---

## Erzverteilung & Progression — Zusammenfassung

```
Tier 1 (0-5h):    Coal + Iron + Copper + Zinc (oben)   → Keine Änderung nötig
Tier 2 (5-15h):   Gold + Lapis + Certus (oben)         → Gold Peak tiefer
Tier 3 (15-30h):  Osmium + Certus + Diamond             → Osmium tiefer gated
Tier 4 (30-50h):  Uranium + Lead + Fluorite             → Sehr selten, sehr tief
Tier 5 (50h+):    Ancient Debris + Osmium-Cluster       → Nur Void-Schicht
```
