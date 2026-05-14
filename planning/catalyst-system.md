# Catalyst-System — Gaia Awakening

> **Status**: Planungsdokument — 2026-05-14
> **Implementiert in**: `kubejs/server_scripts/08_catalyst_system.js` + `06_loot_modifications.js`

## Designprinzip

MA T3+T4 Seeds verlangen `apex:resource_catalyst` bzw. `apex:mythic_catalyst`
als Crafting-Ingredient. Catalysts haben **drei legitime Pfade**:

```
PASSIV (Ore Excavation, background)
    │   0.5% Drop pro Erz aus Vein
    │   ~5-10 Catalysts pro 12h mittlerem Setup
    │
PFAD MA-ALTERNATIV (Bauer mit Brass-Tier Create)
    │   Mech Crafter Rezept aus 3 Essence-Typen + Apo-Gem
    │   ~12-95 Catalysts/h je nach Farm-Größe
    │
PFAD AKTIV (Adventurer / Endgame)
    │   a) Boss-Drops: 1× pro Mowzie's-Boss / Netherite Monstrosity
    │   b) Dungeon-Loot: 8-10% pro Truhe (Dungeons Arise + YUNG's)
    │   c) Catalyst Altar: 1000 mB Hyper XP → 1× Catalyst (Create:EI Spout)
    │   d) Wandering Trader: 15% Chance gegen Emeralds
    │
↓
T3 MA Seeds: Gold, Diamond, Emerald, Glowstone
```

## Mythic Catalyst — Exklusiv

```
QUELLE: Cataclysm Apex-Bosse (Ignis, Harbinger, Ender Guardian)
        1× garantierter Drop pro Kill
        
AUTOMATISIERUNG: Drygmys (Ars Nouveau) + Mob-Effigy
        Drygmy farmt Boss-Drops passiv wenn Mob-Statue aufgestellt
        EINZIGE Automatisierungs-Möglichkeit
        
KEINE alternativen Pfade: Mythic Catalyst hat nur diesen einen Quellweg.
                         Drygmy-Setup ist Late-T4 (Ars Nouveau Apprentice+)

↓
T4 MA Seeds: Osmium, Tin, Lead, Uranium, Fluorite (Mekanism via MA Agradditions)
```

## Drop-Raten — Übersicht

| Quelle | Item | Rate |
|---|---|---|
| Ore Excavation Vein | resource_catalyst | 0.5% pro Erz |
| Dungeons Arise Chest | resource_catalyst | 8% pro Truhe |
| YUNG's Better Dungeons | resource_catalyst | 8% pro Truhe |
| YUNG's Better Strongholds | resource_catalyst | 10% pro Truhe |
| Mowzie's Mobs Boss | resource_catalyst | 100% (1× pro Kill) |
| Cataclysm Netherite Monstrosity | resource_catalyst | 100% (1× pro Kill) |
| **Cataclysm Apex-Endbosse** | **mythic_catalyst** | **100% (1× pro Kill)** |
| Catalyst Altar (Spout) | resource_catalyst | 1× pro 1000 mB Hyper XP |
| Wandering Trader | resource_catalyst | 15% (Trade-Slot) |

## Spielfluss-Beispiele

**Engineer (Create + Mekanism Focus):**
- Pfad 1 dominant: Drill-Setup an erster Iron-Vein, akkumuliert Catalysts passiv
- Pfad 3c sekundär: Catalyst Altar mit überschüssigem Hyper XP von Mob-Farm
- Nach 20h: ~50 Catalysts → alle T3 Seeds zugänglich
- Für T4: muss Cataclysm-Bosse besiegen (oder Drygmy-Anlage)

**Botanist (MA Focus):**
- Pfad 2 dominant: Große Farm + Mech Crafter Catalyst-Conversion
- Nach 20h: ~200+ Catalysts → skaliert auf T4 Mythic Catalyst-Beschaffung
- Für T4: Drygmys + Apex-Mob-Effigy bauen → passive Mythic Catalyst Produktion

**Adventurer (Boss/Dungeon Focus):**
- Pfad 3a/3b dominant: Aktive Welt-Erkundung
- Nach 20h: ~30 Catalysts + 2-3 Mythic Catalysts aus Apex-Bossen
- Mythic-Catalyst-Vorsprung: kann T4 Seeds früher craften als andere Pfade

## Implementation Status

| Komponente | File | Status |
|---|---|---|
| Custom Items registriert | `startup_scripts/00_custom_items.js` | ✅ |
| Catalyst Altar Block | `startup_scripts/00_custom_items.js` | ✅ |
| Ore Excavation Drop | `server_scripts/06_loot_modifications.js` | ⚠️ TODO Verify Loot-Table-Pfad |
| Boss-Drops T3 | `server_scripts/06_loot_modifications.js` | ⚠️ TODO Verify Boss-IDs |
| Boss-Drops Mythic | `server_scripts/06_loot_modifications.js` | ⚠️ TODO Verify Cataclysm-IDs |
| Dungeon-Loot | `server_scripts/06_loot_modifications.js` | ⚠️ TODO Verify Loot-Tables |
| MA-Crafter Recipe | `server_scripts/08_catalyst_system.js` | ⚠️ TODO Verify Essence-IDs |
| Catalyst Altar Spout Recipe | `server_scripts/08_catalyst_system.js` | ⚠️ TODO Create:EI Fluid API |
| MA T3 Seed Overrides | `server_scripts/08_catalyst_system.js` | ⚠️ TODO Verify Seed-IDs |
| MA T4 Seed Overrides | `server_scripts/08_catalyst_system.js` | ⚠️ TODO Verify Seed-IDs |
| Wandering Trader Hook | — | ❌ Noch zu implementieren |

## Verifizierung beim ersten Boot

Nach Pack-Reload `logs/kubejs/server.log` auf folgende Fehler prüfen:
- `Unknown item: mysticalagriculture:iron_essence` → IDs korrigieren
- `Unknown loot table: createoreexcavation:vein/*` → ggf. BlockEvents-Fallback
- `Unknown fluid: create_enchantment_industry:hyper_experience` → ID prüfen
- `Unknown entity: cataclysm:ignis` → Cataclysm-IDs verifizieren via Jade
