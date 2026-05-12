# Erzverteilung — Gaia Awakening

> **Status**: Planungsdokument — 2026-05-01
> **Implementierung**: KubeJS Datapack-Overrides + Create Ore Excavation Config

---

## Designprinzip: Ore Nodes als Kern

Natürlich verteilte Erze sind **Starthilfe** — sie geben frühen Spielern genug Material
um anzufangen, sind aber bewusst zu selten für nachhaltige Automatisierung.

**Create Ore Excavation Nodes** sind die eigentliche Ressourcenquelle: groß, auffindbar
durch Erkundung, und mit Create-Machinery unendlich erneuerbar. Jedes Erz bekommt
einen Node-Typ. Wer keinen Node findet, kann nicht skalieren.

```
NATÜRLICH VERTEILTE ERZE     ──── Starthilfe (60-90% seltener als Vanilla)
        │
        ▼
    Handabbau reicht für Tier 1 Setup
        │
        ▼
CREATE ORE EXCAVATION NODE   ──── Hauptquelle (selten, aber pro Chunk ~500 Blöcke)
        │
        ▼
    Exploration → Node finden → Create Bohranlage aufbauen
        │
        ▼
    Unendliche Ressourcen (Create-powered, kein weiterer Eingriff nötig)
```

**Spielfluss:** T1 = Hand-Mining → T2 = ersten Iron/Zinc-Node finden & anzapfen →
T3 = tiefer, Osmium/Certus-Nodes, Create-Automation ausbauen → T4-T5 = Abyss-Nodes

---

## Natürliche Erzverteilung — Tiefenzonen

**Beta-Phase: Vanilla-Höhe (Y -64 bis +320)** — Tectonic vertical_scale 2.25
**Post-Beta: Tall World (Y -128 bis ~512)** — Tectonic increased_height + scale 3.5+

```
Beta-Setup (Vanilla Y-Limit, Tectonic dramatische Berge)
Y +320  ┌─────────────────────────────────────────────────────┐  ← Build-Limit
        │   Berggipfel / Tectonic Peaks (Y +200 Snow Line)   │  Keine Erze
Y +192  ├─────────────────────────────────────────────────────┤
        │   Zone 1: Oberfläche                                │  Coal, Iron, Copper (reduziert)
Y   +64 ├─────────────────────────────────────────────────────┤
        │   Zone 2: Normale Höhlen                            │  Zinc, Gold, Lapis (stark reduziert)
Y     0 ├═════════════════════════════════════════════════════╡  ← Sea Level
        │   Zone 3: Tiefe Höhlen                              │  Osmium, Certus, Diamond (sehr selten)
Y   -48 ├─────────────────────────────────────────────────────┤
        │   Zone 4: Abyss                                     │  Uranium, Lead, Fluorite (extrem selten)
Y   -64 └─────────────────────────────────────────────────────┘  ← Bedrock (Beta)

(Post-Beta: Y-Range erweitert sich auf -128 unten und ~512 oben, Zone 5
"Void-Schicht" wird unter Y -96 freigeschaltet für Ancient Debris + Osmium-Mega-Cluster)
```

---

## Zone 1 — Oberfläche (Y +64 bis +192)

**Tier 1 — Starthilfe, sofort zugänglich**

| Erz | Vanilla Vein/Chunk | Neu Vein/Chunk | Reduktion | Grund |
|-----|--------------------|----------------|-----------|-------|
| Coal | 30 | 10 | -67% | Node übernimmt mittelfristig |
| Iron | 10 | 4 | -60% | Hand-Mining reicht für T1 |
| Copper | 16 | 6 | -62% | Ähnlich Iron |

Zinc (Create) wird leicht nach unten verschoben (Y 0-60 statt 10-85) — ein paar Adern
bleiben auf der Oberfläche, der Bulk liegt in Zone 2.

---

## Zone 2 — Normale Höhlen (Y -32 bis +64)

**Tier 2 — Create & erste Exploration**

| Erz | Vanilla Vein/Chunk | Neu Vein/Chunk | Reduktion | Grund |
|-----|--------------------|----------------|-----------|-------|
| Zinc (Create) | 8 | 2 | -75% | Node-Fokus, kritisch für Create |
| Gold | 4 | 1 | -75% | Selten und wertvoll |
| Lapis | 2 | 1 | -50% | Für Enchanting weiterhin nötig |
| Redstone | 8 | 3 | -62% | Automation-Grundstoff |
| Ars: Source Gem | 4 | 2 | -50% | Magie-Einstieg |
| AE2: Certus (oben) | 2 | 1 | -50% | Erste AE2-Kristalle |

---

## Zone 3 — Tiefe Höhlen (Y -48 bis 0)

**Tier 3 — Mekanism & AE2 Entry, sehr selten**

| Erz | Vanilla Vein/Chunk | Neu Vein/Chunk | Reduktion | Grund |
|-----|--------------------|----------------|-----------|-------|
| Osmium | 6 | 1 | -83% | Nur Starthilfe für Mekanism T1 |
| Tin (Mekanism) | 5 | 1 | -80% | Bronze-Alloys Einstieg |
| Certus (AE2, tief) | 3 | 1 | -67% | AE2 braucht Node für Skalierung |
| Diamond | 1 | 0.3 | -70% | Sehr selten, stark Node-fokussiert |

---

## Zone 4 — Abyss (Y -96 bis -48)

**Tier 4 — Praktisch kein natürliches Vorkommen**

| Erz | Neu Vein/Chunk | Notizen |
|-----|----------------|---------|
| Uranium | 0.3 | Fast nur über Node zugänglich |
| Lead | 0.5 | Minimal natürlich |
| Fluorite | 0.3 | Chemicals-Gate |
| Osmium (Peak) | 1 | Höhere Konzentration für spätes T3 |

---

## Zone 5 — Void-Schicht (Y -128 bis -96)

**Tier 5 — Nur Nodes, kein natürliches Vorkommen**

| Erz | Neu Vein/Chunk | Notizen |
|-----|----------------|---------|
| Ancient Debris | 0.2 | Praktisch nur Boss/Node |
| Osmium Mega-Cluster | 0.5 | Große Adern für Lategame-Bulk |

---

## Create Ore Excavation — Node-System

### Funktionsweise
Create Ore Excavation platziert große **Ore Nodes** (dichte Erz-Cluster) in der Welt.
Ein Node enthält ~200-500 Erze gebündelt an einem Ort. Mit Create-Bohranlage
(Mechanical Drill + Contraption) wird der Node **unendlich erneuerbar** gezapft.

Hand-Mining eines Nodes gibt ~20-30 Erze (Starthilfe). Create-Automation gibt pro
Stunde hunderte Erze, solange die Anlage läuft.

### Node-Tabelle — Alle Erze

| Node-Typ | Zone | Y-Zentrum | Radius zwischen Nodes | Starthilfe | Create-Output/h |
|----------|------|-----------|----------------------|------------|-----------------|
| Coal Node | 1 | +96 | ~300 Blöcke | 40 Stück | ~800 |
| Iron Node | 1 | +48 | ~350 Blöcke | 30 Stück | ~600 |
| Copper Node | 1 | +64 | ~350 Blöcke | 25 Stück | ~500 |
| Zinc Node | 2 | +20 | ~400 Blöcke | 20 Stück | ~400 |
| Gold Node | 2 | -10 | ~500 Blöcke | 20 Stück | ~300 |
| Lapis Node | 2 | +10 | ~500 Blöcke | 15 Stück | ~250 |
| Redstone Node | 2 | -15 | ~400 Blöcke | 25 Stück | ~500 |
| Source Gem Node | 2 | +20 | ~600 Blöcke | 15 Stück | ~200 |
| Diamond Node | 3 | -35 | ~800 Blöcke | 10 Stück | ~150 |
| Osmium Node | 3 | -30 | ~600 Blöcke | 20 Stück | ~350 |
| Tin Node | 3 | -25 | ~600 Blöcke | 20 Stück | ~300 |
| Certus Node | 3 | -30 | ~700 Blöcke | 15 Stück | ~200 |
| Uranium Node | 4 | -70 | ~1200 Blöcke | 8 Stück | ~100 |
| Lead Node | 4 | -65 | ~900 Blöcke | 12 Stück | ~150 |
| Fluorite Node | 4 | -60 | ~900 Blöcke | 10 Stück | ~120 |
| Ancient Debris Node | 5 | -110 | ~2000 Blöcke | 5 Stück | ~50 |

> **Hinweis zu Output/h**: Richtwert bei einer mittleren Create-Bohranlage (4 Drills,
> 128 RPM). Echte Werte nach Testing anpassen.

### Node-Spawnrate Konfiguration
```toml
# config/createoreexcavation-common.toml (nach erstem Start generiert)
# Nodes seltener als Default um Exploration-Wert zu erhöhen
nodeSpawnRarity = 0.4        # Standard ~1.0 — reduziert auf 40%
nodeRenewable = true         # Nodes unendlich erneuerbar via Create
nodeHandMiningYield = 0.1    # Hand-Mining gibt nur 10% des Node-Inhalts (Starthilfe)
```

---

## Quest-Integration

| Quest | Trigger | Belohnung |
|-------|---------|-----------|
| "Gaia's Adern" (T1) | Ersten Iron-Node gefunden | Create Drill Schematic |
| "Tiefer graben" (T2) | Ersten Zinc-Node angezapft (Create-Bohranlage aktiv) | Mekanism Osmium-Kompass |
| "Das schwarze Gold" (T3) | Ersten Osmium-Node mit Create-Automation | Mekanism Basic Machine Set |
| "Aus der Tiefe" (T4) | Ersten Uranium-Node gefunden | PNC Pressure Tube Kit |
| "Unter der Welt" (T5) | Ancient Debris Node gefunden | Endgame-Crafting-Component |

Ein hypothetischer "Ore-Kompass" (via KubeJS oder Create Ore Excavation built-in) kann
Spieler zum nächsten Node des gewünschten Typs leiten — wichtig für Multiplayer, damit
Spieler nicht stundenlang suchen.

---

## Implementierungs-Reihenfolge

1. **Create Ore Excavation Config** prüfen (nach erstem Start): Node-Rarity, Renewal-Mechanic
2. **Mekanism Datapack-Override** für Osmium/Uranium/Lead Vein-Count Reduktion
3. **Vanilla Placed Features Override** für Diamond/Gold Reduktion (`kubejs/data/minecraft/worldgen/placed_feature/`)
4. **AE2 Certus Override** für reduzierte natürliche Verteilung
5. **Testing**: Mit `/locate` und F3+G Nodes und natürliche Erzverteilung in-Game validieren
