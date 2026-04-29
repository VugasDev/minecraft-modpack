# Ressourcen-Generierung — Übersicht

> **Design-Ziel**: Mehrere parallele Wege zur Ressourcengewinnung, die sich sinnvoll ergänzen.
> Keine Methode ist per se "die beste" — Kontext entscheidet (Frühspiel vs. Late Game).

---

## Ressourcen-Generierungs-Pyramide

```
                        [Endgame]
                    Mekanism Digital Miner
                   (targeted, automatisiert)
                 Pneumaticraft Mining Drones
                   (programmierbar, präzise)
              ──────────────────────────────────
                       [Late Game]
               Mystical Agriculture Tier 5-6
               (unendlich, aber langsam & teuer)
                  Create Mining Contraptions
                   (große Gebiete, effizient)
              ──────────────────────────────────
                       [Mid Game]
               Mystical Agriculture Tier 2-4
                 (zuverlässig, planbar)
                  Serene Seasons Farming
                  (Jahreszeiten-Synergien)
              ──────────────────────────────────
                       [Early Game]
               Vanilla Mining + Apotheosis Fortune
                     Create: Deep Dark
                    (Verstärkte Drops)
```

---

## Methode 1: Mystical Agriculture (Haupt-Generierungsweg)

**Status**: ✓ NeoForge 1.21.1 | ✓ Modrinth
**Add-On**: Mystical Agradditions ✓ (Tier 6 Insanium-Crops)

### Design

Mystical Agriculture erlaubt das Anbauen von Ressourcen als Pflanzen.
Es gibt 6 Tiers, die von gängig bis extrem-selten reichen:

| Tier | Beispiel-Ressourcen | Gate |
|------|-------------------|------|
| T1 | Erde, Holz, Stein | Frühspiel |
| T2 | Kohle, Eisen, Kupfer | Create T1 |
| T3 | Gold, Quartz, Lapislazuli | Create T2 |
| T4 | Diamant, Osmium, Enderperle | Mekanism T1 |
| T5 | Netherit, Certus Quartz, Uran | Mekanism T3 |
| T6 (Insanium) | Netherit Scrap (schnell), Spezialitäten | Endgame |

### Synergien im Stack

```
Serene Seasons  →  beeinflusst Wachstumsrate (Sommer = schneller)
Farmer's Delight →  Ernte-Mechaniken teilen sich Farmland-Logik
Mekanism         →  Crop Matron (automatische Dünger-Bewässerung)
Create           →  Mechanischer Arm harvested automatisch
AE2              →  ME-Netz lagert Crops automatisch ein
```

### Crops für den Modpack-Stack

Wir brauchen Mystic Agradditions-Integration für:
- **Osmium Crop** (Mekanism)
- **Certus Quartz Crop** (AE2)
- **Compressed Iron Crop** (PneumaticCraft)
- **Refined Obsidian Crop** (Mekanism, Endgame)
- **Fluix Crystal Crop** (AE2, Endgame)

---

## Methode 2: Create Mining Contraptions

**Integriert in Create (kein extra Mod nötig)**

### Mining Drill Contraption

Create ermöglicht mechanische Mining-Contraptions mit Bohrköpfen:
- Fahrbarer Bohrer auf Schienen (Steam 'n' Rails)
- Automatische Mine im Strip-Mining-Stil
- Ressourcen direkt ins Create-Fließband

**Progression:**
1. Erster Bohrer (Frühspiel): Kleiner manueller Bohrer
2. Schienen-Bohrer (Midgame): Steam 'n' Rails-Zug mit Bohrer-Front
3. Großer Aeronautics-Bohrer (Late): Fliegende Mining-Platform (Aeronautics!)

---

## Methode 3: Mekanism Digital Miner

**Teil von Mekanism (kein extra Mod)**

- Spezifisches Erz-Targeting (nur Diamanten, nur Osmium etc.)
- Radius einstellbar (max 32 Blöcke)
- Benötigt massive FE-Energie
- Ideal für gezielte Late-Game-Ressourcen

**Gate**: Mekanism T3 + große Energiequelle

---

## Methode 4: Pneumaticraft Drones

**Teil von Pneumaticraft: Repressurized**

- Programmierbare Drohnen mit Mining-Behavior
- Präzises Item-Filtering (holt nur bestimmte Erze)
- Drohnen brauchen Druckluft (Pneumaticraft-Infrastruktur)
- Können in Kombination mit AE2 direkt ins ME-Netz einlagern

**Gate**: Pneumaticraft T2 + Drone-Programmiereinheit

---

## Methode 5: Serene Seasons — Saisonale Ressourcen

**Status**: ✓ NeoForge 1.21.1 | ✓ Modrinth

Serene Seasons beeinflusst:
- Pflanzenwachstum (Mystical Agriculture: Sommer = +20% Wachstumsrate)
- Biom-spezifische Events (manche Ressourcen seasonal)
- Farmer's Delight: Saisonale Zutaten

**Balancing-Möglichkeit**: Seltene Ressourcen nur in bestimmten Jahreszeiten droppen
(via Loot-Table-Customization + KubeJS)

---

## Ressourcen-Generierungs-Matrix

| Ressource | Mystical Agri | Create Mining | Digital Miner | PNC Drones |
|-----------|:---:|:---:|:---:|:---:|
| Eisen | T2 ✓ | ✓ | ✓ | ✓ |
| Gold | T3 ✓ | ✓ | ✓ | ✓ |
| Diamant | T4 ✓ | ✓ | ✓ | ✓ |
| Osmium | T4 ✓ | ✓ | ✓ | ✓ |
| Certus Quartz | T5 ✓ | — (Meteors) | ✓ | ✓ |
| Netherit | T5 ✓ | Nether only | ✓ | ✓ |
| Uran | T5 ✓ | ✓ | ✓ | ✓ |
| Ancient Debris | — | Nether | Nether | Nether |

---

## Energie-Generierungs-Übersicht

> Ressourcen-Generierung braucht Energie — hier der Stack:

| Mod | Quelle | Tier | FE/t |
|-----|--------|------|------|
| Create: C&A | Rotierende Maschinen | T2 | mittel |
| Create: Diesel | Öl-Verbrennung | T2-3 | mittel-hoch |
| Powah: Rebooted | Solar, Thermo, Reactor | T2-4 | mittel-sehr hoch |
| Mekanism: Gen | Solar, Wind, Gas-Burning | T3-4 | hoch |
| Mekanism: Gen | Bio-Fuel Generator | T2 | niedrig |
| Mekanism: Gen | Fusion Reactor | T5 | extrem |

**Powah: Rebooted** füllt eine schöne Lücke:
- Früheres Mid-Game als Mekanism Generators
- Energizing Recipes (crafting mit Energie) als interessante Mechank
- Kein riesiger Infrastruktur-Aufwand
- **Empfehlung**: Ins Modpack aufnehmen als Energie-Brücke T2→T3

---

## Neue Mods für Ressourcen-System

| Mod | Zweck | Status | Priorität |
|-----|-------|--------|-----------|
| **Mystical Agriculture** | Crop-basierte Ressourcen | ✓ 1.21.1 | Pflicht |
| **Mystical Agradditions** | Tier 6 + Modded Crops | ✓ 1.21.1 | Pflicht |
| **Serene Seasons** | Jahreszeiten + Farming-Synergien | ✓ 1.21.1 | Empfohlen |
| **Powah: Rebooted** | Energie-Brücke Mid-Game | ✓ 1.21.1 | Empfohlen |

---

## Offene Fragen

- [ ] Compressed Creativity (Create↔PNC) NICHT für 1.21.1 — nach Release beobachten
- [ ] Mystic Agradditions: Welche Mod-Crops werden unterstützt? Osmium, Certus, Compressed Iron?
- [ ] Serene Seasons: Genauer Einfluss auf Mystical Agriculture Wachstum prüfen
- [ ] Powah Reactor als Zwischen-Endgame (vor Mekanism Fusion Reactor) definieren?
