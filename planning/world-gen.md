# World Generation Design — "Apex-Height" & "Shattered Lands"

> **Status**: Konzept — 2026-04-29
> Ziel: Eine vertikal (896 Blöcke) und horizontal (32.000+ Blöcke) massiv ausgedehnte Welt.

---

## Technische Parameter (Oberwelt)

| Parameter | Wert | Grund |
|-----------|------|-------|
| **Minimum Y** | -128 | Tieferer Untergrund für Dungeons & Mekanism |
| **Total Height** | 896 | Massiver Spielraum für Aeronautik |
| **Terrain Max Y** | ~512 | Massive Gebirgszüge via Tectonic |
| **Build Limit** | 768 | Viel Luftraum über den Gipfeln |
| **Sea Level** | 64 | Standard-Höhe |

---

## Die Zonen-Einteilung (Distanz-basiert)

Das Terrain moduliert sich basierend auf der Entfernung vom Spawn (0,0):

1.  **Zone: Apex Mainland (0 - 10.000 Blöcke)**
    *   Massive Berge (Tectonic) bis Y=512 auf festem Boden.
    *   Hauptgebiet für den technischen Aufbau.

2.  **Zone: The Transition (10.000 - 32.000 Blöcke)**
    *   Das Land wird zerklüfteter, riesige Schluchten bis zum Bedrock.
    *   Vorbereitung auf den "Absturz" des Terrains.

3.  **Zone: Shattered Outer Rim (> 32.000 Blöcke)**
    *   **Kein durchgehender Boden**.
    *   Schwebende Insel-Archipele in drei Layern:
        *   Low-Orbit (Y=0 bis 128)
        *   Cloud-Layer (Y=256 bis 384)
        *   High-Apex (Y=512 bis 640) - Endgame Bosse & OP Loot.

---

## Performance & Pre-Generation Strategie

Um Lags beim schnellen Fliegen (Aeronautics) zu vermeiden:

### Pre-Generation (Chunky)
1.  **Core-PreGen**: 10.000er Radius um den Spawn komplett generieren.
2.  **Expedition-Corridors**: 32-Chunk breite vorgenerierte Pfade zu fernen Zielen (32km+).
3.  **Target-Gen**: Ziel-Archipele im 2km-Radius vorab generieren.

### Engine-Optimierung (NeoForge 1.21.1)
1.  **C2ME**: Multi-Core Chunk Management für die komplexen Density Functions.
2.  **Noisium**: Optimierte Noise-Berechnungen für On-the-fly Generierung.
3.  **Krypton Reno**: Netzwerk-Stack Optimierung gegen Rubberbanding.
4.  **Radium Reforged**: Logik-Optimierung (Physics/AI).
5.  **Distant Horizons**: LOD-Rendering für die 32km Fernsicht.

---

## Welt-Presets (Wählbar im Menü)

Um maximale Flexibilität zu bieten, definieren wir vier World Presets in `data/apex/worldgen/world_preset/`:

### 1. Preset: "Apex: Standard Modded"
*   **Beschreibung**: Die klassische Erfahrung mit Terralith & Tectonic.
*   **Höhe**: Standard (-64 bis 320).
*   **Feature**: Keine Shattered Lands.
*   **Zielgruppe**: Spieler, die eine "normale" Modded-Welt wollen.

### 2. Preset: "Apex: The Grand Journey" (Deine Vision)
*   **Beschreibung**: Das volle Paket. Massive Berge und weit entfernte Inseln.
*   **Höhe**: **896 Blöcke** (-128 bis 768).
*   **Feature**: **Shattered Lands ab 32.000 Blöcken**.
*   **Zielgruppe**: Das vorgesehene Modpack-Erlebnis.

### 3. Preset: "Apex: Skybound Only"
*   **Beschreibung**: Eine Welt, die nur aus schwebenden Inseln besteht.
*   **Höhe**: **896 Blöcke**.
*   **Feature**: Nur schwebende Insel-Layer von 0 bis 32.000+ km. Kein durchgehender Boden ("Void" unten).
*   **Zielgruppe**: Hardcore-Aeronauten.

### 4. Preset: "Apex: Eternal Mainland"
*   **Beschreibung**: Vertikale Extreme ohne Insel-Strukturen.
*   **Höhe**: **896 Blöcke**.
*   **Feature**: Massive Tectonic-Berge bis in alle Ewigkeit. Keine Shattered Lands.
*   **Zielgruppe**: Baumeister, die massiven Untergrund bevorzugen.

---

## Implementierungs-Details (KubeJS / Datapack)
...

*   **Datenmenge**: Eine 32km Welt ist riesig.
    *   *Lösung*: Nur Korridore und wichtige Gebiete vorgenerieren, nicht die gesamte Fläche.
*   **Performance**: 896 Blöcke Höhe belasten die CPU.
    *   *Lösung*: **C2ME** und **Noisium** sind Pflicht.
*   **Dunkelheit**: Y=-128 ist tief und finster.
    *   *Lösung*: Apotheosis Nachtsicht-Items als Quest-Belohnung.
