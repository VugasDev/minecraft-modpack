# Progression Design — Create-Fokus, Casual Multiplayer

> **Status**: Erster Entwurf — 2026-04-29

---

## Progression-Übersicht

```
[Vanilla Start]
      │
      ▼
[Stufe 1: Handwerk & Erkundung]     ← Casual-freundlicher Einstieg
  Create: Erste Maschinen
  Apotheosis: Enchanting T1-T2
  Artifacts: Erste Funde in Dungeons
  FTB Chunks (Map), FTB Ultimine (Mining)
  Waystones, Quests
  ┌─────────────────────────────────┐
  │ Optional: Farmer's Delight      │ ← Komfort-Pfad, jederzeit
  └─────────────────────────────────┘
      │
      ▼
[Stufe 2: Mechanisierung]            ← Create-Kern
  Create: Automation, Fließbänder, Pressen
  Steam 'n' Rails: Eisenbahn-Netz
  Sophisticated Backpacks/Storage
  ┌──────────────────────┐  ┌──────────────────────┐
  │ Ars Nouveau          │  │ Optional: Occultism   │  ← Ars = Hauptpfad
  │ (aktive Spells)      │  │ (Dämonologie/Storage) │    Occultism = dunklere
  │ + Ars Creo (Create)  │  │                       │    Alternative
  └──────────────────────┘  └──────────────────────┘
  ⛔ Botania nicht verfügbar für NeoForge 1.21.1
      │
      ▼
[Stufe 3: Digitalisierung]           ← AE2-Gate
  Create: Crafts & Additions (FE-Brücke)
  Applied Energistics 2: ME-Netzwerk
  Mekanism: Energie & Chemie
  Apotheosis: Gem-Socketing freigeschaltet
  ┌─────────────────────────────────────────────────┐
  │ Optional: Pneumaticraft                         │
  │ Erste Compressors → Pressure Chamber aufbauen   │ ← Enchantment-
  │ Apotheosis Enchants T2 (Level 6-10) vorhanden   │   Eskalations-Pfad
  └─────────────────────────────────────────────────┘
      │
      ▼
[Stufe 4: Industrialisierung]        ← Mekanism-Kern
  Mekanism: Generators (Solar, Wind)
  AE2: Crafting CPUs, Pattern Provider
  Iron's Spells: Kampf-Magie
  Bosse: Mowzie's Mobs & Cataclysm (Einstieg)
  ┌─────────────────────────────────────────────────┐
  │ Pneumaticraft: Pressure Chamber 3.5 bar         │
  │ → Enchantment Tier 3 freigeschaltet (Lvl 25)   │ ← Mid-Game OP
  │   Material: Mekanism Refined Obsidian +         │
  │             Apotheosis Normal Gems              │
  └─────────────────────────────────────────────────┘
      │
      ▼
[Stufe 5: Aeronautik]                ← Create Aeronautics Gate
  Create Aeronautics: Erstes Luftfahrzeug
  Mekanism: Fusion Reactor (Endgame-Energie)
  AE2: Vollautomatisches ME-System
  ┌─────────────────────────────────────────────────┐
  │ Pneumaticraft: High-Pressure (5.5 bar)          │
  │ → Enchantment Tier 4 freigeschaltet (Lvl 50)   │ ← Late-Game OP
  │   Material: AE2 Fluix + Apotheosis Epic Gems    │
  └─────────────────────────────────────────────────┘
      │
      ▼
[Endgame: Fliegende Festung]
  Vollautomatisierte fliegende Basis
  Ars Nouveau: Boss-Farmen via Drygmies
  Apotheosis & Cataclysm: Alle Bosse besiegt
  Mekanism Fusion Reactor aktiv
  ┌─────────────────────────────────────────────────┐
  │ Pneumaticraft: Extreme-Pressure (7.5 bar)       │
  │ → Enchantment Tier 5: GODLIKE (Lvl 100)        │ ← Endgame-Belohnung
  │   Material: AE2 + Apotheosis Mythic +           │
  │             Mekanism + Create                   │
  └─────────────────────────────────────────────────┘
```

---

## APEX Ore Processing — Stufenübersicht

| Tier | Multiplikator | Benötigt | Gate |
|------|:---:|---------|------|
| T1 | x1 | Ofen | Sofort |
| T2 | x2 | Create: Crushing Wheels | Create T2 |
| T3 | x4 | Create + Mekanism Enrichment | Mekanism T1 |
| T4 | x8 | Create + Mekanism Purification (O₂) | Mekanism T3 |
| T5 | x16 | Create + Mekanism + Pneumaticraft Pressure (4 bar) + Plastik | Pneumaticraft T2 |

Vollständige Mechanik → `planning/mods/ore-processing-system.md`

---

## Stufe 1 — Handwerk & Erkundung (Stunden 1-5)

**Ziel**: Casual-freundlicher Einstieg, auch für unerfahrene Spieler.

**Freigeschaltet:**
- Alle Vanilla-Features
- Create: Zahnräder, Wellen, einfache Maschinen (Presse, Mühle)
- Apotheosis: Verbesserte Enchanting-Tische (T1)
- **Artifacts**: Erste Trinkets in Dungeons (Handschuhe, Schuhe)
- **FTB Ultimine**: Erleichtertes Ressourcen-Sammeln
- Waystones: Erste Wegpunkte
- **FTB Chunks**: Minimap & Chunk-Loading freigeschaltet
- Mystical Agriculture: Tier 1-2 Seeds (Erde, Holz, Stein, Kohle, Eisen)
- Serene Seasons: Erste Jahreszeit aktiv
- Farmer's Delight: Freigeschaltet

**Quest-Fokus:**
- Tutorial: Wie funktioniert Create? (Drehmoment, Drehzahl)
- Erste Ausrüstung und Rüstung
- Welt erkunden, erste Strukturen finden
- **Relics**: Suche dein erstes Relikt (Quest-Belohnung: Starter-Relikt)
- Erste Mystical Agriculture Farm anlegen (T1 Seeds)
- APEX Ore Chain T2: Erste Crushing Wheels

**Custom Rezepte:**
- Keine kritischen Änderungen in dieser Phase

---

## Stufe 2 — Mechanisierung (Stunden 5-15)

**Ziel**: Create als Hauptmechanik etablieren.

**Freigeschaltet:**
- Create: Fließbänder, Trichter, Mechanische Arme, Wassermühlen
- Create: Steam 'n' Rails (nach erstem Dampfkessel)
- Ars Nouveau: Erste Spells | Occultism: Dämonologie-Einstieg
- Sophisticated Backpacks (nach Leder-Stufe)
- Iron Chests → Functional Storage Drawers
- Mystical Agriculture: Tier 3 Seeds (Gold, Quartz)
- APEX Ore Chain T2 vollständig (x2 via Crushing Wheels)
- Powah: Rebooted — erste Energiequellen

**Quest-Fokus:**
- "Baue deine erste automatisierte Eisenmine"
- "Lege dein erstes Schienennetz"
- "Erkunde einen verbesserten Dungeon"
- **Boss**: Besiege den Ferrous Wroughtnaut (Mowzie's Mobs)
- "APEX T2: Richte Crushing Wheels ein" (x2 Multiplier)

**Custom Rezepte (Balancing):**
- AE2 ME-Controller: Erfordert Create-Komponenten (Präzisionsmechanismus etc.)
- Apotheosis Gem-Socketing: Erst nach Mekanism-Metallen freigeschaltet
- Mystical Agriculture T4+ Seeds: Erfordern Mekanism-Komponenten

---

## Stufe 3 — Digitalisierung (Stunden 15-30)

**Ziel**: Übergang von mechanisch zu digital.

**Gate**: Create: Crafts & Additions muss installiert sein (FE-Brücke)

**Freigeschaltet:**
- Create: Crafts & Additions (Elektromotoren, FE-Generierung)
- Applied Energistics 2: Certus-Quartz farmen → ME-Netz aufbauen
- Mekanism: Basic Factory → Ore-Tripling
- Apotheosis: Alle Enchanting-Features

**Quest-Fokus:**
- "Dein erstes ME-Netzwerk"
- "Verbinde Create-Rotationsenergie mit Mekanism"
- **Relics**: Level dein Relikt auf Stufe 5
- "APEX T3: x4 Multiplikation (Create + Mekanism Enrichment)"
- "Osmium Crop: Mystical Agriculture T4 freigeschaltet"
- "Erste Pneumaticraft-Druckluft-Infrastruktur"

**Custom Rezepte (Balancing):**
- ME-Controller: Präzisionsmechanismus (Create) als Crafting-Komponente
- Mekanism Energy Cube: Osmium erst nach Create-Tier 2
- Mystical Agriculture T4 Seeds: Mekanism Enriched Iron als Crafting-Gate

---

## Stufe 4 — Industrialisierung (Stunden 30-50)

**Ziel**: Große Automatisierung, Magie-Endgame vorbereiten.

**Freigeschaltet:**
- Mekanism: Generators, fortgeschrittene Maschinen
- AE2: Crafting CPUs, Auto-Crafting
- Iron's Spells: Fortgeschrittene Zauber
- Apotheosis: Bosse (Horseman, Lich, etc.)

**Quest-Fokus:**
- "Baue ein vollautomatisches Crafting-System"
- **Bosse**: Besiege den Netherite Monstrosity (Cataclysm)
- "APEX T4: x8 Multiplikation (Mekanism Purification + O₂)"
- "Erste Fusionsreaktor-Komponenten"
- "Pneumaticraft: Plastik aus Öl-Raffinerie"
- "Enchantment Tier 3: Pressure Chamber 3.5 bar → Level 25"

---

## Stufe 5 — Aeronautik (Stunden 50+)

**Ziel**: Create Aeronautics als Krönungsfeature.

**Gate**: Mekanism Advanced Alloys + Create Tier 3

**Freigeschaltet:**
- Create Aeronautics: Flugzeuge, Luftschiffe
- Mekanism: Fusion Reactor (Endgame-Energie)
- Vollausbau AE2

**Quest-Fokus:**
- "Dein erstes Luftschiff"
- "Bau eine fliegende Fabrik"
- **Apex-Bosse**: Besiege Ignis und den Harbinger (Cataclysm)
- "OP Loot": Sammle ein vollständiges Set aus Cataclysm-Waffen + Apotheosis Mythic Gems
- "APEX T5: x16 Multiplikation (Pressure Chamber 4 bar + Plastik)"
- "Fusion Reactor: Die Sonne in deiner Basis"
- "Mystical Agriculture T6: Insanium Crops"
- "Enchantment Tier 4+5: Level 50 und 100"

---

## Multiplayer-Überlegungen

- **Shared Progression**: Quest-Fortschritt pro Team (FTB Quests Party-System)
- **Spezialisierung möglich**: Spieler können Rollen übernehmen (Builder, Techniker, Erkunder)
- **Server-Performance**: Mekanism-Reaktoren und große Create-Konstrukte = Lag-Risiko
  - Config: Tick-Rate von Mekanism anpassen
  - Create: Physik-Objekte limitieren (Contraption-Limit)

---

## Gating-Mechanismen

| Gate | Methode | Grund |
|------|---------|-------|
| AE2 ME-Controller | Custom Rezept mit Create-Komponenten | Technik-Pfad vor Digitalem |
| Mekanism Fusion Reactor | Quest-Lock + Custom Rezept | Endgame-Only |
| Create Aeronautics | Quest-Chain abschließen | Storytelling-Gate |
| Apotheosis Gem-Socketing | Mekanism-Metall als Rezept-Ingredient | Power-Limit früh |
| Mekanism Tools | Apotheosis-Boss besiegen | Magie-/Technik-Synergy |
