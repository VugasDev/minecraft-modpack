# Mod-Liste — NeoForge 1.21.1

> **Status**: Verifiziert für 0.1.x — 2026-04-30
> Alle Mods müssen auf Modrinth verfügbar sein.
> ⚠️ = Verfügbarkeit für NeoForge 1.21.1 vor Einbau prüfen

---

## CORE — Performance & Libraries

| Mod | Zweck | Prio | Anmerkung |
|-----|-------|------|-----------|
| **Embeddium** | NeoForge-Sodium (GPU-Optimierung) | Pflicht | Ersatz für Sodium auf NeoForge |
| **Iris Shaders** | Shader-Support (NeoForge-nativ) | Pflicht | Kompatibel mit Embeddium |
| **FerriteCore** | RAM-Optimierung | Pflicht | |
| **Moonrise** | Lighting-Engine-Optimierung | Pflicht | Starlight-Nachfolger |
| **Clumps** | XP-Kugeln zusammenfassen (Performance) | Pflicht | |
| **ModernFix** | Ladezeiten & allg. Performance | Pflicht | |
| **Distant Horizons** | Level-of-Detail Chunks (weite Sicht) | Pflicht | Client-only |
| ~~Voxy~~ | ~~Alternative zu DH~~ | — | ⛔ Kein NeoForge 1.21.1 Port (Fabric-only auf Modrinth) |
| **Chunky** | World Pre-Generation | Pflicht | **Essenziell für 32km Exploration** |
| **C2ME** | Multi-Core Chunk Management | Pflicht | **Essenziell für 800er Height** |
| **Radium Reforged** | Game-Logic Optimierung (Lithium-Port) | Pflicht | |
| **Krypton Reno** | Netzwerk-Stack Optimierung | Pflicht | |
| **Noisium** | Welt-Gen Mathematik Optimierung | Pflicht | |
| **ServerCore** | Dynamische Server-Optimierung | Pflicht | |
| **NeoForge** | Mod Loader | Pflicht | |
| **Kotlin for Forge** | Kotlin-Library (für manche Mods) | Pflicht | |
| **Cloth Config API** | Config-Library | Pflicht | |
| **Architectury API** | Cross-Loader API | Pflicht | |
| **Patchouli** | In-Game Guidebooks | Pflicht | Für Create-Handbuch etc. |
| **LootJS** | Loot-Table Modifikation via KubeJS (Boss-Drops) | Pflicht | Benötigt für 06_loot_modifications.js |
| **KubeJS REI Integration** | REI-Items via KubeJS verstecken | Pflicht | Benötigt für 03_ui_cleanup.js |
| **Citadel** | Library für Cataclysm | Pflicht | |
| **GeckoLib** | Animation-Library | Pflicht | Für Mowzie's Mobs & Spells |
| **OctoLib** | Library für Relics | Pflicht | |

---

## CREATE — Hauptpfad

| Mod | Zweck | Balancing-Bedarf | Anmerkung |
|-----|-------|-----------------|-----------|
| **Create** | Kern-Mod — Mechanik, Automation | Hoch | Basis für alles |
| **Create Aeronautics** | Fliegende Fahrzeuge & Strukturen | Optional | ⚠️ Alpha — für 0.1.x deaktiviert, ab 0.4.x evaluieren |
| **Create: Steam 'n' Rails** | Erweiterte Züge & Schienen | Niedrig | Gut zur Aeronautics-Synergie |
| **Create: Crafts & Additions** | Elektromotoren, Akkus (Create↔FE) | Mittel | Brücke zu Mekanism/AE2 |
| **Create Deco** | Dekorative Create-Blöcke | Niedrig | Optisch, kein Balancing |
| **Create: Interiors** | Möbel & Innenausstattung | Niedrig | Gut für Luftschiff-Innenräume |
| **Create: Diesel Generators** | Kraftstoff-basierte Energie | Mittel | Alternative Energiequelle |
| **Create: Dreams & Desires** | Neue Maschinen & Rezepte | Optional | ✓ NeoForge 1.21.1 — noch Beta (v2.2d-BETA), Stabilität beobachten |

---

## DIGITAL-TECHNIK — Mittlerer & Late-Game Pfad

| Mod | Zweck | Balancing-Bedarf | Anmerkung |
|-----|-------|-----------------|-----------|
| **Applied Energistics 2** | Digitales Storage & Automation | Hoch | Gate hinter Create-Fortschritt |
| **AE2 Things** | AE2-Erweiterungen | Niedrig | QoL für AE2 |
| **Extended AE** | AE2 Late-Game Ausbau | Niedrig | ✓ NeoForge 1.21.1 |
| **Applied Mekanistics** | **AE2 ↔ Mekanism Brücke** | Mittel | ✓ NeoForge 1.21.1 — Pflicht-Addon |
| **Mekanism** | Energie, Processing, Gase | Hoch | Sehr mächtig — gating nötig |
| **Mekanism: Generators** | Energieerzeugung (Solar, Wind, Fusion) | Hoch | Fusion Reactor = Endgame |
| **Mekanism: Tools** | Mekanism-Rüstung & Werkzeuge | Mittel | |
| **Industrial Foregoing** | Automation-Lückenfüller, Mob-Fabriken | Mittel | ✓ NeoForge 1.21.1 |
| **Functional Storage** | Drawer-Storage Frühspiel (vor AE2) | Niedrig | ✓ NeoForge 1.21.1 |
| **XNet** | Cross-Mod Kabel-Routing (Items/Energie/Fluid) | Niedrig | ✓ NeoForge 1.21.1 |
| **XNet Gases** | XNet + Mekanism-Gase | Niedrig | ✓ NeoForge 1.21.1 |
| ~~Thermal Foundation~~ | ~~Ressourcen & Basis-Technik~~ | — | ⛔ Kein Modrinth-Port für 1.21.1 |
| **Create: Simple Ore Doubling** | x2 für Create Crushing (deterministisch) | Niedrig | ✓ Modrinth — oder via KubeJS ersetzbar |

---

## MAGIE & ENHANCEMENT

| Mod | Zweck | Balancing-Bedarf | Anmerkung |
|-----|-------|-----------------|-----------|
| **Apotheosis** | Enchanting-Overhaul, Bosse, Loot | Hoch | **Pflicht!** Basis für OP-Enchants |
| **Apotheosis: Compatibility** | Apotheosis für andere Mods | Mittel | |
| **Ars Nouveau** | Spell-Crafting, aktive Magie | Mittel | **Haupt-Magie-Pfad** ✓ NeoForge 1.21.1 |
| **Ars Additions** | Ars Nouveau QoL + Glyphen | Niedrig | ✓ NeoForge 1.21.1 |
| **Ars Creo** | **Create ↔ Ars Nouveau Brücke** | Niedrig | ✓ NeoForge 1.21.1 — Pflicht-Addon |
| **Iron's Spells 'n Spellbooks** | Kampf-Magie, Klassen | Niedrig | Ergänzt Ars Nouveau |
| **Occultism** | Dämonologie, Dimensional Storage | Optional | **Botania-Ersatz** — ✓ NeoForge 1.21.1 |
| **Enigmatic Legacy+** | Artefakte & Relikte | Optional | ✓ NeoForge 1.21.1 — Achtung: Modrinth-Mod heißt "Enigmatic Legacy+" (1.21.1-Port) |

> ⛔ **Botania**: NICHT verfügbar für NeoForge 1.21.1 (kein Port, kein ETA).
> Botania fällt raus — Ars Nouveau ist Haupt-Magie. Occultism als zweiter optionaler Pfad wenn verfügbar.

---

## ENCHANTMENT-SYSTEM — Drei-Mod-Stack

> Vollständige Dokumentation: `planning/quests/enchantment-system.md`

| Mod | Rolle im System | Status |
|-----|----------------|--------|
| **Create: Enchantment Industry** | Liquid XP, Blaze Forger (kombinieren), Printer (kopieren), Blaze Enchanter (+1 Level via Hyper XP) | ✓ NeoForge 1.21.1 |
| **Enchantment Library Standalone** | Enchantment-Fortschritt speichern & abrufen (Points-System) | ✓ NeoForge 1.21.1 |
| **Apotheosis** | Level-Cap-Removal, Basis-Enchanting T1-T2 | ✓ NeoForge 1.21.1 |
| **Pneumaticraft** | Große Sprünge: Level 10→25, Level 50→100 | ✓ NeoForge 1.21.1 |

**Workflow**: `Apotheosis (1-10)` → `PNC Sprung (10→25)` → `Create EI Loop (25→50)` → `PNC Sprung (50→100)`

---

## PNEUMATICRAFT — Enchantment-Escalation-Pfad

> **Design-Intention**: Pneumaticraft ist der Weg zu Enchantments über die normalen Apotheosis-Limits hinaus.
> Die Pressure Chamber wird zur Crafting-Station für Bücher mit Level 25 / 50 / 100+.
> Starker optionaler Pfad mit hohem Reward.

| Mod | Zweck | Balancing-Bedarf | Anmerkung |
|-----|-------|-----------------|-----------|
| **Pneumaticraft: Repressurized** | Druckluft-Technik + Pressure Chamber | **Sehr hoch** | Kern-Mechanismus für OP-Enchants |
| ~~PneumaticCraft: Aeronautics~~ | ~~Drone-Automation~~ | — | ⛔ Kein eigenständiger Mod auf Modrinth gefunden — gestrichen |

**Rolle von Pneumaticraft im Enchantment-System** (große Sprünge):
- Sprung 1: Pressure Chamber (2.5 bar) → Level 10 → Level 25 (Mekanism Obsidian + Apotheosis Normal Gems)
- Sprung 2: Pressure Chamber (6.0 bar) → Level 50 → Level 100 (AE2 Certus + Apotheosis Mythic + Create Precision Mech.)

---

## EXPLORATION & DUNGEONS

| Mod | Zweck | Balancing-Bedarf | Anmerkung |
|-----|-------|-----------------|-----------|
| **Terralith** | Vanilla+ Weltgenerierung | Niedrig | Client+Server |
| **Tectonic** | Massive Berge & weite Landschaften | **Mittel** | **Essentiell für 800er World Height** |
| **Artifacts** | Seltene Accessoires in Dungeons | Mittel | **Adventure-Fokus** |
| **Relics** | Mächtige Artefakte mit Level-System | Mittel | **Adventure-Fokus** |
| **YUNG's Better Dungeons** | Verbesserte Dungeons | Niedrig | |
| **YUNG's Better Mineshafts** | Verbesserte Minen | Niedrig | |
| **YUNG's Better Strongholds** | Verbesserte Strongholds | Niedrig | |
| **YUNG's Better Witch Huts** | Verbesserte Hexenhütten | Niedrig | |
| **Dungeons and Taverns** | Neue Strukturen | Niedrig | |
| **When Dungeons Arise** | Große Dungeons & Türme | Niedrig | ✓ NeoForge 1.21.1 |
| **Repurposed Structures** | Neue Vanilla-Strukturvarianten | Niedrig | |
| **Waystones** | Schnellreise-Punkte | Niedrig | Wichtig für Casual |
| **Compact Machines** | Miniatur-Dimensionen für Maschinen | Niedrig | **Platz- & Performance-Optimierung** |

---

## BOSSE & ABENTEUER (Zusätzliche Herausforderungen)

| Mod | Zweck | Balancing-Bedarf | Anmerkung |
|-----|-------|-----------------|-----------|
| **L_Ender's Cataclysm** | Epische Bosse (Ignis, Harbinger) | **Hoch** | Quelle für "OP Loot" |
| **Bosses of Mass Destruction** | Zusätzliche Bosse in Dimensionen | Mittel | |
| **Mowzie's Mobs** | Einzigartige, animierte Bosse | Mittel | ✓ NeoForge 1.21.1 |
| **Simple Magnets** | Magnet-Trinket (QoL) | Niedrig | |

---

## QoL — Quality of Life

| Mod | Zweck | Anmerkung |
|-----|-------|-----------|
| **FTB Quests** | Quest-System | Kern-Feature |
| **FTB Chunks** | Minimap, Worldmap & Chunk-Loading | **Wichtig für Automation** |
| **FTB Ultimine** | Schnelles Mining (Veinminer) | QoL / Casual |
| **Roughly Enough Items (REI)** | Rezepte & Item-Browser | NeoForge-kompatibel |
| **Jade** | Block/Entity-Info beim Hinschauen | |
| **Inventory Profiles Next** | Inventar sortieren | ✓ NeoForge 1.21.1 |
| **Iron Chests: Restocked** | Größere Truhen | |
| **Sophisticated Backpacks** | Rucksäcke mit Filtern | Wichtig für Exploration |
| **Sophisticated Storage** | Erweiterte Truhen | Synergie mit Backpacks |
| **Curios API** | Zubehör-Slots (Ringe, Amulette) | Library für Apotheosis etc. |
| **Toast Control** | Toast-Notifications kontrollieren | |
| **Configured** | In-Game Config-Editor | |
| **Mouse Tweaks** | Bessere Maus-Inventarsteuerung | |
| **Controlling** | Tastenbelegung-Suche | |
| **Carry On** | Truhen & Mobs tragen | |
| **AppleSkin** | Hunger/Sättigung-Anzeige | |
| **Durability Viewer** | Haltbarkeits-HUD | |

---

## RESSOURCEN-GENERIERUNG

| Mod | Zweck | Balancing-Bedarf | Anmerkung |
|-----|-------|-----------------|-----------|
| **Mystical Agriculture** | Crop-basierte Ressourcen-Generierung | Hoch | ✓ NeoForge 1.21.1 |
| **Mystical Agradditions** | Tier 6 Crops + Modded Resources (Osmium etc.) | Hoch | ✓ NeoForge 1.21.1 |
| **Create: Ore Excavation** | Unendliche Erzadern via Create Rotational Force | Mittel | ✓ NeoForge 1.21.1 — APEX-Synergie |
| **Serene Seasons** | Jahreszeiten — beeinflusst MA-Wachstum, Farming | Niedrig | ✓ NeoForge 1.21.1 |
| **Powah: Rebooted** | Energie-Brücke T2→T3 (vor Mekanism Generators) | Mittel | ✓ NeoForge 1.21.1 |

---

## FOOD & SURVIVAL (optional)

| Mod | Zweck | Anmerkung |
|-----|-------|-----------|
| **Farmer's Delight** | Kochen & Farming — optionaler Komfort-Pfad | ✓ NeoForge 1.21.1 |
| **Veggies Delight** | Mehr Gemüse + Strukturen | ✓ NeoForge 1.21.1 |
| **More Delight** | Mehr Mahlzeiten & Zutaten | ✓ NeoForge 1.21.1 |
| **Chef's Delight** | Koch/Bäcker-Villager-Profession | ✓ NeoForge 1.21.1 |
| **Serene Seasons** | Jahreszeiten (Farming-Synergie) | ✓ NeoForge 1.21.1 |

---

## ABGELEHNTE / NICHT VERFÜGBARE MODS

| Mod | Grund |
|-----|-------|
| Sodium | Fabric-only — Embeddium ist der NeoForge-Ersatz |
| Lithium | Fabric-only |
| Quark | Kompatibilitätsprobleme mit Create häufig |
| ProjectE | Zu stark für Casual-Balance (EMC bricht Progression) |
| **Botania** | ⛔ Kein NeoForge 1.21.1 Port (kein ETA) |
| **Applied Botanics** | ⛔ Hängt von Botania ab |
| **Thermal Foundation/Expansion** | ⛔ Kein Modrinth-Port für NeoForge 1.21.1 |
| **Ars Elemental** | ⛔ CurseForge-exklusiv |
| **Compressed Creativity** | ⛔ Nur bis 1.20.1 — beobachten für zukünftigen Port |
| **Voxy** | ⛔ Kein NeoForge 1.21.1 Port — Fabric-only auf Modrinth (Stand 2026-04-30) |
| **PneumaticCraft: Aeronautics** | ⛔ Kein eigenständiger Mod auf Modrinth auffindbar (Stand 2026-04-30) |
| **Enigmatic Legacy** (Original) | Kein NeoForge 1.21.1 Port — Nachfolger: **Enigmatic Legacy+** (in Mod-Liste als Optional geführt) |

---

## BALANCING-PRIORITÄTEN (Custom KubeJS Rezepte nötig)

1. **Apotheosis** — Gem-Socketing und Enchanting-Power gaten
2. **Mekanism Fusion Reactor** — hinter langen Progression sperren
3. **AE2 ME-Controller** — Create-Komponenten als Crafting-Material
4. **Create ↔ AE2 Brücke** — Create: Crafts & Additions als Pflicht-Gate
5. **Mekanism Tools** — Apotheosis-Level als Voraussetzung

---

## OFFENE FRAGEN

- [x] Occultism NeoForge 1.21.1-Status geprüft — ✓ verfügbar (v1.207.1, Stand 2026-04-30)
- [ ] Mystical Agradditions: Welche Mod-Crops enthalten? (Osmium, Certus, Compressed Iron?)
- [ ] Serene Seasons Einfluss auf Mystical Agriculture Wachstum testen
- [ ] Create: Simple Ore Doubling vs. reines KubeJS-Rezept — entscheiden
- [ ] Compressed Creativity beobachten (bei Port auf 1.21.1 nachziehen)
- [ ] Finale Mod-Anzahl schätzen: aktuell ~80-90 Mods geplant
