# Balancing-Notizen

> **Status**: In Planung — wird mit KubeJS implementiert

---

## Kritische Balancing-Probleme (out-of-the-box)

### 1. Apotheosis — Enchanting als Fundament, Pneumaticraft als Deckenbrecher
**Design**: Apotheosis ist das normale Enchanting-System (T1-T2, Level 1-10).
Levels über 10 sind **ausschließlich** über die Pneumaticraft Pressure Chamber möglich.
**Config**:
- Apotheosis: Level-Cap-Removal aktivieren (für Pressure-Chamber-Outputs)
- Apotheosis: Max-Level im normalen Enchanting-Table auf 10 beschränken
- Hochwertige Gems (Epic, Mythic) nur in hochrangigen Dungeons (When Dungeons Arise, YUNG's)
- Gem-Socketing erst nach Mekanism-Tier freigeschaltet (Config oder Quest-Gate)

### 2. AE2 — Zu früh verfügbar
**Problem**: Spieler können AE2 direkt nach Certus-Quartz skipppen Create-Automation.
**Lösung**: ME-Controller benötigt `create:precision_mechanism` und `create:propeller` im Rezept.

### 3. Mekanism Ore-Tripling — Bricht Ressourcen-Balance
**Problem**: 3x-Ausbeute zu früh = alle anderen Mods verlieren Bedeutung.
**Lösung**: Enrichment Chamber erst nach Create-Tier 2 (Präzisionsmechanismus-Gate).

### 4. Mekanism Fusion Reactor — Unendliche Energie zu einfach
**Problem**: Fusion Reactor macht alle anderen Energie-Quellen obsolet.
**Lösung**:
- Extrem teures Custom Rezept für Hohlraumzellen
- Quest-Lock: Erst nach "Aeronautics"-Quest-Chapter freigeschaltet

### 5. Create: Crafts & Additions — FE-Generierung zu billig
**Problem**: Elektromotoren erzeugen schnell massiv FE.
**Lösung**: Config-Anpassung der FE/RPM-Effizienz, nicht zu früh im Quest-Tree.

### 6. Botania Mana-Infinity (falls gewählt)
**Problem**: Endoflame-Spam erzeugt unendlich Mana trivial.
**Lösung**: Config: Endoflame-Mana-Output reduzieren.

---

## Custom Rezept-Pläne (KubeJS)

### AE2 ME-Controller
```
Vanilla: 8x Iron Block + ME-Controller
Custom:  + 4x Create:Precision_Mechanism + 2x Create:Propeller
```

### Mekanism Enrichment Chamber
```
Custom: Erfordert Create:Mechanical_Press im Inventar (via FTB Quests Flag, kein Rezept-Gate)
Alternativ: Custom Ingredientz = Create-Gears der Tier 2
```

### Apotheosis Gem-Socketing (Vial of Expungement)
```
Custom: + Mekanism:Refined_Obsidian_Ingot als Zusatz-Ingredient
```

### Mekanism Fusion Reactor (Hohlraumzellen)
```
Custom: Jede Hohlraumzelle erfordert AE2:Fluix_Crystal + Create:Precision_Mechanism
```

---

## Config-Änderungen (kein KubeJS nötig)

| Mod | Config-Datei | Änderung |
|-----|-------------|---------|
| Mekanism | mekanism/mekanism.toml | Fusion-Reactor Mindest-Temp erhöhen |
| Create | create-common.toml | Contraption-Entity-Limit |
| Apotheosis | apotheosis/enchanting.toml | Level-Cap-Removal an, normaler Table auf Max-10 |
| Apotheosis | apotheosis/gems.toml | Epic/Mythic Gems nur in Elite-Dungeon-Loot |
| Create: C&A | createaddition-common.toml | FE/RPM-Ratio |
| Pneumaticraft | pneumaticcraft.toml | Max-Druck auf 10+ bar (für T5) |
| Botania | botania.toml | Endoflame-Mana-Output reduzieren |

---

## Loot-Table Anpassungen

- Apotheosis Gems (hoch): Nur in "When Dungeons Arise" + YUNG's Better Dungeons
- AE2 Meteorite-Compass: Spawn-Rate erhöhen (QoL für neue Spieler)
- Mekanism Schematics: In hochrangigen Dungeon-Truhen
