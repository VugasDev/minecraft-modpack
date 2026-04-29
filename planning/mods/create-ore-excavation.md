# Create: Ore Excavation — Ressourcen-Generierung

**Status**: ✓ NeoForge 1.21.1 (v1.6.8, Nov 2025) | ✓ Modrinth

---

## Was es tut

Create: Ore Excavation fügt **versteckte, unendliche Erzadern** in die Weltgenerierung ein:

- Pro Chunk: zufällige Chance eine unsichtbare Erzader zu enthalten
- Nur **eine** Ader pro Chunk
- Abbau via **Create Rotational Force** (Bohrköpfe, Contraptions)
- **Ore Vein Finder Tool**: Zeigt Adern in der Umgebung an

### Schlüsseleigenschaft: "Unendlich"
Im Gegensatz zu normalen Erzvorkommen sind diese Adern nicht erschöpfbar durch normales Mining.
Sie werden durch Create-Maschinen abgebaut, die sie langsam "anzapfen".

---

## Synergie mit dem Stack

### APEX Ore Chain (x16)
```
Create Ore Excavation Ader (unendlich)
        ↓ Create Bohrer/Contraption
Roherz (kontinuierlich)
        ↓ APEX Tier 2-5
Crushed → Enriched → Purified → Refined Pellets
        ↓
bis zu 16× Ingots pro Erz
```

→ Unendliche Ader × x16 Multiplikation = vollständig automatisierte, skalierbare Produktion

### Create Aeronautics
Eine **fliegende Mining-Platform** (Aeronautics) + Ore Vein Finder könnte:
- Über der Welt fliegen
- Adern lokalisieren
- Automatisch abbauen und zurückfliegen

→ Endgame-Feature: Fliegendes Erzabbau-Schiff

### Mekanism Digital Miner Abgrenzung
| Feature | Create Ore Excavation | Mekanism Digital Miner |
|---------|----------------------|----------------------|
| Ressource | Unendliche Adern | Endliche Welt-Erze |
| Steuerung | Rotational Force | FE (Energie) |
| Targeting | Ader-basiert | Block-spezifisch |
| Automation | Create-Fließband | Eigenes Filter-System |
| Gate | Create T2 | Mekanism T3 |
| Skalierung | Durch Bohrer-Größe | Durch Radius-Upgrade |

→ **Beide Methoden sinnvoll und komplementär** — kein Overlap

---

## Vein Finder Tool

- Zeigt umliegende Adern an (Radius konfigurierbar)
- Hilft bei der Planung von Mining-Contraptions
- Early-Mid Game: Manuell Adern finden und Bohrer draufsetzen
- Late Game: Via Pneumaticraft Drones automatisch Adern scannen?

---

## Balancing-Überlegungen

- **Unendliche Ressourcen** klingen op — aber:
  - Abbaurate hängt von Create-Rotational-Power ab (je mehr Power, desto schneller)
  - Rotation braucht Energiequelle (Steam, Diesel Generators, etc.)
  - Fließband zur Weiterverarbeitung braucht Infrastruktur
  - APEX-Chain braucht Mekanism-Gase (O₂, HCl)
  - → Keine "free resources", sondern skalierbare Ressourcen für Late-Game-Automation

- **Eine Ader pro Chunk**: Begrenzt die Anzahl paralleler Extraktion-Points
  → Spieler müssen aktiv Adern suchen und priorisieren

---

## Integration in Progression

| Stufe | Anwendung |
|-------|----------|
| T2 (Create) | Erste Ader gefunden, einfacher Bohrer |
| T3 (Mekanism) | APEX x4 angeschlossen → deutlich mehr Output |
| T4 | APEX x8 + Schienen-basierter Abbau (Steam 'n' Rails) |
| T5 (Aeronautics) | Fliegendes Mining-Schiff sucht Adern automatisch |

---

## Empfehlung

**Ins Modpack aufnehmen** — ideal als "Create-nativer" Ressourcen-Generator der:
1. Früh verfügbar ist (Create T2)
2. Mit APEX skaliert (x16 Late Game)
3. Einen eigenen Gameplay-Loop hat (Adern suchen, Bohrer aufstellen, Fließband bauen)
4. Aeronautics-Integration als Endgame-Feature ermöglicht
