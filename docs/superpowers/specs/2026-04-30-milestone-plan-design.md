# Milestone-Plan: APEX Modpack Versionsstruktur

> **Status**: Genehmigt — 2026-04-30
> **Zielgruppe**: ~5 Personen, gemischte Erfahrung (Veteranen bis Einsteiger)
> **Plattform**: Modrinth — öffentliche Veröffentlichung geplant, frühe Alphas mit WIP-Disclaimer

---

## Philosophie

Iterative Entwicklung: Freunde spielen von Beginn an mit, Fehler werden laufend behoben, Features schrittweise eingebaut. Frühe Versionen sind bewusst unvollständig — das wird transparent kommuniziert.

**Persistente Welt ab `0.1.x`**: Kein Welt-Reset nach Erstkonfiguration. World Gen muss vor dem ersten Join final sein.

---

## Versionsschema

`0.Y.Z` — Y = Milestone-Sprint, Z = Bugfix-Patch innerhalb des Sprints.
Ab Public Release: `1.0.0`.

---

## Milestones

### `0.1.x` — Technisches Fundament

**Abnahmekriterium**: Modpack startet fehlerfrei, Server läuft, alle 5 Spieler können joinen, Welt wurde mit finalem World Gen erstellt.

**In Scope:**
- Mod-Liste finalisiert: jeder Mod auf NeoForge 1.21.1 Verfügbarkeit geprüft
- Create Aeronautics Alpha-Status geklärt (ggf. Fallback-Entscheidung)
- LootJS + KubeJS REI Integration zur Mod-Liste hinzugefügt
- Modrinth `modrinth.json` Manifest vollständig aufgebaut
- KubeJS-Scripts fehlerfrei im Log (Fixes bereits implementiert)
- World Gen konfiguriert: Terralith, Tectonic (800er Höhe), alle Struktur-Mods
- C2ME + Noisium für Chunk-Performance aktiv
- Chunky pre-generiert definierten Radius vor erstem Join
- Server aufgesetzt und erfolgreich mit 5 Spielern getestet
- Modrinth-Upload mit WIP-Disclaimer

**Bewusst nicht enthalten:**
- Quest-Content (Spieler erkunden frei)
- Balancing-Feinschliff
- Boss-Loot-System aktiv

---

### `0.2.x` — Frühspiel

**Abnahmekriterium**: Ein Neuling kann Tier 1 vollständig durchspielen ohne zu stecken.

**In Scope:**
- Alle Tier 1 Quests vollständig & poliert (t1_basics, t1_create_01–03, t1_util, optionale)
- Create Tier 1→2 Balancing bestätigt (Water Wheel → Steam Engine)
- Ore Processing Chain spielbar (Crushing Wheels → Enrichment Chamber)
- Electric Motor Gate (Create→FE Brücke) live
- REI sauber, QoL-Mods bestätigt funktionsfähig (Waystones, Backpacks, Jade)
- Erste Balancing-Runde nach echtem Spieler-Feedback

**Bewusst nicht enthalten:**
- Tier 2+ Quest-Content
- Enchantment-System
- AE2/Mekanism Gates

---

### `0.3.x` — Midgame

**Abnahmekriterium**: Durchgehende Progression von Tier 1 bis Tier 3 ohne Lücken oder Deadlocks.

**In Scope:**
- Tier 2 Quests (Dampfkraft, Ars Nouveau, Sophisticated Storage, optional: Occultism, Steam 'n' Rails)
- Tier 3 Quests (AE2 Einstieg, Mekanism Energie & Ore Processing, Pneumaticraft Basis)
- AE2 ME Controller Gate live (Create Precision Mechanism)
- Mekanism Enrichment Chamber Gate live
- Enchantment-System vollständig implementiert:
  - Create EI (Blaze Forger, Printer, Liquid XP)
  - Enchantment Library Standalone
  - Pneumaticraft Pressure Chamber Sprünge (Level 10→25, 50→100)
- Apotheosis Config finalisiert (Level-Cap, Gem-Rarity)
- Zweite Balancing-Runde

**Bewusst nicht enthalten:**
- Tier 4+ Content
- Cataclysm Boss System

---

### `0.4.x` — Lategame-Vorbereitung

**Abnahmekriterium**: Spieler können Cataclysm Apex-Bosse sinnvoll angehen und das Gate zum Endgame passieren.

**In Scope:**
- Tier 4 Quests (Mekanism Purifier Chain, Cataclysm-Vorbereitung, Boss-Raid 1)
- Cataclysm Entity-IDs verifiziert, Singularity Shard Loot via LootJS live
- Mekanism Fusion Reactor Gate scharf gestellt (apex:singularity_shard benötigt)
- Pneumaticraft Enchantment-Pfad Level 50→100 spielbar
- Boss-Loot-System (Apotheosis Gem-Drops, Tier-Staffelung)
- Erste Create Aeronautics Tests & Stabilitätsbewertung
- Dritte Balancing-Runde

**Bewusst nicht enthalten:**
- Gaia Cathedral vollständig spielbar
- Tier 5 Quest-Content

---

### `0.9.x` — Release-Kandidat

**Abnahmekriterium**: Kompletter Playthrough von Tier 1 bis Gaia-Erwachen möglich. Keine Welt-Resets mehr ab dieser Version.

**In Scope:**
- Tier 5 Quests vollständig (Gaia Cathedral, Reaktor-Sync, Boss-Trio, Gaia-Erwachen)
- Gaia Cathedral Scanner funktional & getestet
- apex:gaia_awakening_token Sieg-Quest implementiert
- Create Aeronautics Integration entschieden (drin oder als optionaler Content)
- Performance-Tests: 5 Spieler gleichzeitig, Chunky-Auslastung, TPS-Stabilität
- Alle Configs & Loot-Tables finalisiert
- Modrinth-Seite: vollständige Beschreibung, Screenshots, Mod-Liste

**Bewusst nicht enthalten:**
- Neue Features (nur Fixes & Polish)

---

### `1.0.0` — Public Release

**Abnahmekriterium**: Stabil, vollständig, dokumentiert.

**In Scope:**
- Alle 0.9.x Kriterien erfüllt
- Öffentliche Modrinth-Veröffentlichung
- Release-Notes für alle Versionen vorhanden

---

## Aktueller Stand (Stand: 2026-04-30)

### Bereits implementiert
- KubeJS-Scripts vollständig (alle kritischen Bugs gefixt)
- Gaia Cathedral System designed & implementiert (04_gaia_scanner.js)
- Custom Items: apex:singularity_shard, apex:gaia_core, apex:gaia_pillar, apex:gaia_awakening_token
- Boss Loot: 06_loot_modifications.js (wartet auf Entity-ID-Verifikation)
- Tier 1 FTB Quests: tier_1.json im korrekten Format mit allen 5 Quests
- Planungsdokumente: T1–T5, Enchantment-System, Boss-Loot, World Gen

### Offene TODOs vor `0.1.x`
- [ ] Create Aeronautics Block-IDs verifizieren (`airship_helm` etc.)
- [ ] Cataclysm Entity-IDs im Spiel prüfen (Ignis, Harbinger, Ender Guardian)
- [ ] **LootJS** zur Mod-Liste hinzufügen
- [ ] **KubeJS REI Integration** Addon zur Mod-Liste hinzufügen
- [ ] Mod-Liste vollständig auf NeoForge 1.21.1 Verfügbarkeit prüfen
- [ ] `modrinth.json` Manifest vollständig aufbauen
- [ ] World Gen konfigurieren (Terralith, Tectonic, Chunky-Radius definieren)
- [ ] Server aufsetzen & Verbindungstest mit Gruppe
- [ ] `t1_mag_01` Quest klären (war in alter tier_1.json referenziert, Inhalt unbekannt)
