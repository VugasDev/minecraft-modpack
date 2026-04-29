# Interconnectivity Addons — Analyse

> **Stand**: 2026-04-29, recherchiert für NeoForge 1.21.1 / Modrinth

---

## KRITISCHER FUND: Botania NICHT verfügbar für NeoForge 1.21.1

> ⛔ Botania ist aktuell noch nicht auf NeoForge 1.21.1 portiert (kein ETA).
> Applied Botanics (AE2↔Botania-Brücke) fällt damit ebenfalls weg.
>
> **Konsequenz**: Botania als Magie-Pfad A streichen → Ersatz finden (siehe unten).

---

## BESTÄTIGTE BRIDGE-MODS (Modrinth + NeoForge 1.21.1)

### 1. Applied Mekanistics — AE2 ↔ Mekanism
**Modrinth**: ✓ | **NeoForge 1.21.1**: ✓ (v1.6.3)
- Mekanism-Chemikalien in AE2-ME-Netzwerk speichern und routen
- Chemical P2P-Tunnel, Chemical Storage Cells
- **Wertung**: Pflicht — ohne das sind AE2 und Mekanism isolierte Inseln

### 2. Ars Creo — Create ↔ Ars Nouveau
**Modrinth**: ✓ | **NeoForge 1.21.1**: ✓ (v5.2.0)
- Starbuncle Wheel: Ars-Nouveau-Starbuncles erzeugen Create Rotational Power (SU)
- Spell-Turrets auf Create-Contraptions montieren
- Source-Fluid in Create-Maschinen nutzbar
- **Wertung**: Pflicht — perfekte Synergie zwischen den zwei Hauptpfaden

### 3. Ars Additions — Ars Nouveau QoL
**Modrinth**: ✓ | **NeoForge 1.21.1**: ✓ (v21.1.5)
- Zusätzliche Spell-Glyphen und QoL-Verbesserungen
- **Wertung**: Empfohlen

---

## STORAGE-PIPELINE (Früh- bis Midgame-Brücke zu AE2)

### 4. Functional Storage — Drawer-basiertes Frühspiel-Storage
**Modrinth**: ✓ | **NeoForge 1.21.1**: ✓ (v1.4.2)
- Compacting Drawers, Storage Controller, Wireless-Linking
- Füllt die Lücke zwischen Vanilla-Truhen und AE2
- Progression: Vanilla Truhen → Functional Storage Drawers → Sophisticated Storage → AE2
- **Wertung**: Empfohlen — macht die Storage-Progression flüssiger

### 5. Extended AE — AE2 Erweiterungen
**Modrinth**: ✓ | **NeoForge 1.21.1**: ✓ (v2.0.1)
- Pattern-Encoder, Item-Konverter, zusätzliche AE2-Maschinen
- **Wertung**: Optional — gut für Late-Game AE2-Ausbau

---

## ROUTING & NETZWERK (Cross-Mod Verbindungen)

### 6. XNet — Optimiertes Kabel-Netzwerk
**Modrinth**: ✓ | **NeoForge 1.21.1**: ✓ (v7.0.5)
- Einheitliche Kabel für Items, Energie, Fluids, Redstone, Daten
- **XNet Gases** (Addon): NeoForge 1.21.1 ✓ — Mekanism-Gase via XNet routen
- Besonders wertvoll für Mekanism-Chemie-Pipelines
- **Wertung**: Empfohlen — reduziert Kabel-Chaos bei komplexen Setups

### 7. Modular Routers — Flexibles Item-Routing
**Modrinth**: ✓ | **NeoForge 1.21.1**: ✓ (v13.2.3)
- Modul-basiertes Item-Routing zwischen allen Mod-Inventaren
- Ergänzt XNet für spezielle Item-Routing-Fälle
- **Wertung**: Optional — nützlich, aber XNet deckt viel ab

---

## AUTOMATION (Lückenfüller zwischen Create und Mekanism)

### 8. Industrial Foregoing — Automation-Brücke
**Modrinth**: ✓ | **NeoForge 1.21.1**: ✓ (v3.6.23)
- Mob-Fabriken, Pflanzmaschinen, Fluid-Syphons
- Füllt Automatisierungslücken die Create und Mekanism lassen
- Add-Ons verfügbar: IF Souls, IF Woot Addon, More IF Addons
- **Wertung**: Empfohlen — besonders für Mob-Farming und Fluid-Automation

---

## BOTANIA-ERSATZ — Optionen

Da Botania nicht verfügbar ist, brauchen wir einen Ersatz für den "Natur-/Passive-Magie"-Pfad:

### Option A: Hexerei ⚠️ (NeoForge 1.21.1 prüfen)
- Hexenkessel, Kräuter, Tränke-System, Natur-Magie
- Passiverer Stil ähnlich wie Botania

### Option B: Occultism ⚠️ (NeoForge 1.21.1 prüfen)
- Dämonologie, Geister-Beschwörung, Storage-Dimension
- Interessant: Occultism hat ein eigenes Lager-System (Dimensional Storage)
- Stärker auf "dunkle Magie" ausgerichtet

### Option C: Malum ⚠️ (NeoForge 1.21.1 prüfen)
- Dark-Ritual-Magie, Altäre, passive Effekte
- Ästhetisch sehr stark

### Option D: Nur Ars Nouveau als einziger Magie-Pfad
- Ars Nouveau ist bereits sehr umfangreich
- Mit Ars Creo (Create-Brücke) und Ars Additions (QoL) ist es vollständig
- Einfachste Lösung — weniger Komplexität für Casual-Spieler

> **Empfehlung**: Option D (Ars Nouveau as-is) + Eine der Optionen A/B/C als kleinen zweiten Pfad.
> Occultism wäre interessant wegen der Dimensional Storage-Synergie mit AE2.

---

## FARMER'S DELIGHT ADDONS (Bestätigt)

| Addon | Status | Inhalt |
|-------|--------|--------|
| **Veggies Delight** | ✓ NeoForge 1.21.1 | Mehr Gemüse, Strukturen |
| **More Delight** | ✓ NeoForge 1.21.1 | Mehr Mahlzeiten, Zutaten |
| **Chef's Delight** | ✓ NeoForge 1.21.1 | Koch/Bäcker-Villager |

---

## NICHT VERFÜGBAR (für NeoForge 1.21.1 / Modrinth)

| Mod | Problem |
|----|---------|
| **Botania** | Kein NeoForge 1.21.1 Port (kein ETA) |
| **Applied Botanics** | Hängt von Botania ab |
| **Thermal Series** | Nur CurseForge, kein Modrinth für 1.21.1 |
| **Compressed Creativity** | Create ↔ Pneumaticraft Brücke — 1.21.1 Status unklar |
| **Ars Elemental** | CurseForge-exklusiv |
| **Ars Instrumentum** | CurseForge-exklusiv |

---

## EMPFOHLENE ADDITIONS ZUM STACK

### Pflicht-Additions (starke Synergien)
1. **Applied Mekanistics** — AE2 ↔ Mekanism
2. **Ars Creo** — Create ↔ Ars Nouveau

### Empfohlene Additions
3. **Functional Storage** — Storage-Progression Frühspiel
4. **XNet + XNet Gases** — Cross-Mod Routing (bes. Mekanism-Gase)
5. **Industrial Foregoing** — Automation-Lückenfüller
6. **Ars Additions** — Ars Nouveau QoL
7. **Farmer's Delight Addons** (Veggies, More, Chef's)

### Optionale Additions
8. **Extended AE** — AE2 Late-Game Erweiterung
9. **Modular Routers** — Flexibles Item-Routing
10. **Botania-Ersatz** (Occultism / Hexerei / Malum) — prüfen

---

## INTERCONNECTIVITY-MAP (nach Additions)

```
[Create] ←─── Ars Creo ───→ [Ars Nouveau]
   │                              │
   │ C&A (FE)                Ars Additions
   ▼                              │
[Mekanism] ←── Appl.Mekanism ──→ [AE2]
   │                  │           │
   │ XNet Gases    Ext. AE    Applied Botanics
   │                           (wenn Botania kommt)
   ▼
[Pneumaticraft] ←─ Compressed Creativity ─→ [Create]
                         (⚠️ Status prüfen)

[Farming] ─── Farmer's Delight ─── Veggies/More/Chef's Delight

[Storage Pipeline]:
Truhen → Functional Storage → Sophisticated Storage → AE2 ME-Netz
                                      ↕
                              XNet / Modular Routers
```
