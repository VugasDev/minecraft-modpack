# APEX — Ore Processing System
### Automated Progressive EXtraction (x1 → x16)

> **Design-Ziel**: Jede Multiplikationsstufe erfordert aktiv ein anderes Mod-System.
> Kein Mod allein kommt an x16 — das ist ein echtes Cross-Mod-Feature.
> Jede Stufe ist optional, aber lohnender.

---

## Das vollständige Chain-System

```
                    ┌─────────────────────────────────────────────┐
                    │              APEX ORE CHAIN                  │
                    └─────────────────────────────────────────────┘

  RAW ORE
     │
     ▼
┌─────────────────────────────────────────────────────────────────┐
│ TIER 1 — x1 — Vanilla Smelting                                  │
│  Ofen / Blast Furnace                                           │
│  Gate: Sofort                                                    │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼ [Tier 2 freigeschaltet: Create Tier 2]
┌─────────────────────────────────────────────────────────────────┐
│ TIER 2 — x2 — Create Mechanical Crushing                        │
│  Create: Crushing Wheels                                        │
│  1 Ore → 2× Crushed Ore (KubeJS-Rezept: deterministisch 2x)    │
│  Crushed Ore → Furnace → Ingot                                  │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼ [Tier 3 freigeschaltet: Mekanism Tier 1]
┌─────────────────────────────────────────────────────────────────┐
│ TIER 3 — x4 — Create + Mekanism Enrichment                      │
│  Create: Crushing Wheels → 2× Crushed Ore                       │
│  Mekanism: Enrichment Chamber (KubeJS: akzeptiert Crushed Ore)  │
│  2× Crushed Ore → Enrichment (x2 pro Stück) → 4× Ore Dust      │
│  Ore Dust → Furnace/Alloy Smelter → Ingot                       │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼ [Tier 4 freigeschaltet: Mekanism T3 + Gas-Infrastruktur (O₂)]
┌─────────────────────────────────────────────────────────────────┐
│ TIER 4 — x8 — Create + Mekanism Purification Chain              │
│  Create: Crushing Wheels → 2× Crushed Ore                       │
│  Mekanism:                                                       │
│    Purification Chamber (O₂) → 2× Clump pro Crushed Ore        │
│    Crusher → 2× Dirty Dust pro Clump                            │
│    Enrichment Chamber → 2× Ore Dust pro Dirty Dust              │
│    Effektiv: 2 Crushed → 8× Ore Dust (x4 durch Mekanism-Chain) │
│  Net: 1 Ore × 2 (Create) × 4 (Mekanism) = 8× Ingots            │
└─────────────────────────────────────────────────────────────────┘
     │
     ▼ [Tier 5 freigeschaltet: Pneumaticraft High-Pressure + Plastik]
┌─────────────────────────────────────────────────────────────────┐
│ TIER 5 — x16 — Create + Mekanism + Pneumaticraft                │
│  Vorherige Stufen: → 8× Ore Dust (aus Tier 4)                   │
│  Pneumaticraft Pressure Chamber (4 bar):                         │
│    8× Ore Dust                                                   │
│    + 4× Pneumaticraft Plastic Sheet (aus Öl-Raffinerie)         │
│    + 1× Mekanism Brine (Salz-Lösung, leicht herstellbar)        │
│    → 16× [Metal] Refined Pellets                                 │
│  Refined Pellets → Furnace → Ingot                              │
│  Net: 1 Ore × 2 (Create) × 4 (Mekanism) × 2 (PNC) = 16× Ingot │
└─────────────────────────────────────────────────────────────────┘
```

---

## Warum Pneumaticraft Plastik als Gate?

Pneumaticraft produziert **Plastic Sheets** aus **Öl** über eine eigene Raffinerie-Kette:
1. Öl pumpen (in der Welt vorkommend oder via Create: Diesel Generators)
2. Thermopneumatic Processing Plant: Öl → Biodiesel → Plastic
3. Plastic Sheet: Crafting-Ingredient für alle fortgeschrittenen PNC-Rezepte

**Synergien:**
- Create: Diesel Generators nutzt dasselbe Öl → **Ressourcen-Konkurrenz** (Energie oder Plastik?)
- Mekanism Electrolytic Separator produziert Brine aus Wasser + Salz → minimal aufwendig
- Das Gate kombiniert: Pneumaticraft Infrastruktur aufbauen + Öl-Entscheidung treffen

---

## KubeJS-Implementierung — Schlüsselstellen

### 1. Create Crushing Wheels → deterministisches x2
```javascript
// src/kubejs/server_scripts/ore_processing/create_crushing.js
ServerEvents.recipes(event => {
  const crushedOres = [
    ['minecraft:iron_ore',   'minecraft:raw_iron',      'create:crushed_raw_iron'],
    ['minecraft:gold_ore',   'minecraft:raw_gold',      'create:crushed_raw_gold'],
    ['minecraft:copper_ore', 'minecraft:raw_copper',    'create:crushed_raw_copper'],
    // Mekanism-Metalle:
    ['mekanism:osmium_ore',  'mekanism:raw_osmium',     'apex:crushed_osmium'],
    // ... alle relevanten Erze
  ]

  crushedOres.forEach(([ore, raw, crushed]) => {
    // Ore Block → 2× Crushed (deterministisch, kein Zufall)
    event.custom({
      type: 'create:crushing',
      ingredients: [{ item: ore }],
      results: [
        { item: crushed, count: 2 },
        // Kleiner Bonus-Drop (10%): bleibt aus Balance-Gründen optional
        // { item: 'create:experience_nugget', chance: 0.1 }
      ],
      processingTime: 200
    })
    // Raw Material → 2× Crushed (für Raw-Block-Variante)
    event.custom({
      type: 'create:crushing',
      ingredients: [{ item: raw }],
      results: [{ item: crushed, count: 2 }],
      processingTime: 200
    })
  })
})
```

### 2. Mekanism Enrichment: Crushed Ore als Input
```javascript
// src/kubejs/server_scripts/ore_processing/mekanism_crushed_input.js
// Mekanism akzeptiert von Haus aus schon Create-Crushed-Ore für viele Metalle,
// aber für Mods-Metalle brauchen wir Custom-Rezepte:
ServerEvents.recipes(event => {
  event.custom({
    type: 'mekanism:enriching',
    input: { ingredient: { item: 'apex:crushed_osmium' } },
    output: { item: 'mekanism:dust_osmium', count: 2 }
  })
  // ... weitere custom Metalle
})
```

### 3. Pneumaticraft Pressure Chamber — Tier 5 (x16)
```javascript
// src/kubejs/server_scripts/ore_processing/pnc_tier5.js
ServerEvents.recipes(event => {
  const apexMetals = [
    ['mekanism:dust_iron',   'apex:refined_iron_pellet'],
    ['mekanism:dust_gold',   'apex:refined_gold_pellet'],
    ['mekanism:dust_osmium', 'apex:refined_osmium_pellet'],
    // ...
  ]

  apexMetals.forEach(([dust, pellet]) => {
    event.custom({
      type: 'pneumaticcraft:pressure_chamber',
      inputs: [
        { item: dust, count: 8 },
        { item: 'pneumaticcraft:plastic', count: 4 },
        { item: 'mekanism:brine_bucket', count: 1 }  // oder als Fluid-Input
      ],
      outputs: [
        { item: pellet, count: 16 },
        // Brine-Eimer zurückgeben
        { item: 'minecraft:bucket', count: 1 }
      ],
      pressure: 4.0
    })
  })
})
```

### 4. Refined Pellets → Ingots (Smelting)
```javascript
// Einfaches Smelting-Rezept für alle Refined Pellets:
ServerEvents.recipes(event => {
  event.smelting('mekanism:ingot_iron', 'apex:refined_iron_pellet').xp(0.1)
  // oder via Mekanism Energized Smelter (schneller + kein Ofenslot)
})
```

---

## Unterstützte Metalle (geplant)

| Metall | Vanilla? | Quelle | Tier 5 sinnvoll? |
|--------|---------|--------|-----------------|
| Eisen | ✓ | Vanilla | ✓ |
| Gold | ✓ | Vanilla | ✓ |
| Kupfer | ✓ | Vanilla | ✓ |
| Osmium | — | Mekanism | ✓ |
| Zinn | — | Mekanism ⚠️ / Thermal | ✓ |
| Blei | — | Mekanism | ✓ |
| Uran | — | Mekanism | ✓ (Fusion-Gate) |
| Netherit (Schrott) | ✓ | Vanilla | ✓ (teuer) |
| Certus Quartz | — | AE2 | Optional |

---

## Balancing-Überlegungen

- **Plastik als Verbrauchsmaterial**: Öl ist begrenzt → macht x16 nicht "gratis" in großem Maßstab
- **Brine**: Leicht herzustellen (Mekanism Electrolytic Separator), kein harter Gate
- **Tier 4→5 Kosten**: 8 Dust + 4 Plastic → 16 Pellets = man investiert 4 Plastic pro 2 Bonus-Ingots
  - Pro Pellet: 0.25 Plastic + 0.5 Dust → 1 Ingot
  - Lohnt sich nur bei großer Skala → perfekt für Late-Game-Automation
- **Keine Tier-5-Automation ohne AE2**: Die Pipeline ist so komplex, dass man AE2 Auto-Crafting braucht
  → Zwingt den Spieler, alle Systeme zu verbinden

---

## Offene Implementierungsfragen

- [ ] Mekanism akzeptiert Create Crushed Ore nativ? (Testen — evtl. schon built-in)
- [ ] Pneumaticraft Fluid-Input für Brine (Eimer vs. Fluid-Interface)
- [ ] `apex:` Namespace: Brauchen wir ein eigenes Mini-Mod, oder reichen KubeJS-Custom-Items?
  - KubeJS kann Custom Items registrieren → kein extra Mod nötig
- [ ] Serene Seasons beeinflusst Mystical Agriculture Crop Growth Rate?
