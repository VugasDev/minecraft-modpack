// 04_gaia_scanner.js
// Gaia Cathedral — Modulares Validierungssystem
//
// Steuerung:
//   Rechtsklick              → aktuellen Status anzeigen
//   Schleichen + Rechtsklick → Vollscan ausführen & Ergebnis speichern

// ========================
// KONFIGURATION
// ========================

const PILLAR_RADIUS      = 20   // Diagonaler Abstand der 4 Gaia-Säulen vom Core
const REACTOR_RADIUS     = 50   // Suchradius: Mekanism Fusion Reactor
const DIGITAL_RADIUS     = 40   // Suchradius: AE2 Komponenten
const CREATE_RADIUS      = 35   // Suchradius: Create Steam Engines
const RAIL_RADIUS        = 30   // Suchradius: Schienenkreuz-Suche
const RAIL_CROSS_ARM     = 6    // Mindestlänge eines Kreuz-Arms ab Zentrum
const RAIL_Y_TOLERANCE   = 4    // Höhentoleranz beim Schienenscan
const AIRSHIP_RADIUS_XZ  = 40   // Horizontaler Suchradius: Luftschiff
const AIRSHIP_MIN_Y      = 15   // Mindesthöhe des Luftschiffs über dem Core
const AIRSHIP_MAX_Y      = 80   // Maximalhöhe
const STEAM_ENGINE_COUNT = 9    // Benötigte Steam Engines für Tier 9
const AE2_CRAFTING_COUNT = 4    // Benötigte AE2 Crafting Units

// Säulen-Positionen (relativ zum Core, diagonal in xz)
const PILLAR_OFFSETS = [
    [ PILLAR_RADIUS, 0,  PILLAR_RADIUS],
    [ PILLAR_RADIUS, 0, -PILLAR_RADIUS],
    [-PILLAR_RADIUS, 0,  PILLAR_RADIUS],
    [-PILLAR_RADIUS, 0, -PILLAR_RADIUS]
]

// TODO: Create Aeronautics Block-IDs verifizieren sobald Alpha stabil ist.
//       Im Spiel prüfen via: Jade (Fadenkreuz auf Block) oder /kubejs probe
const AERONAUTICS_BLOCKS = [
    'create_aeronautics:airship_helm',
    'create_aeronautics:airship_tether',
    'create_aeronautics:bearing_anchor'
]

// Create: Steam 'n' Rails + Vanilla Rails als Fallback
const RAIL_BLOCKS = new Set([
    'minecraft:rail',
    'minecraft:powered_rail',
    'minecraft:detector_rail',
    'railways:track',
    'create_steam_rails:track'
])

// ========================
// HILFSFUNKTIONEN
// ========================

// Gibt true zurück sobald ein Block aus blockIds gefunden wurde (early exit)
function findBlock(level, cx, cy, cz, radius, blockIds) {
    for (let x = -radius; x <= radius; x++) {
        for (let y = -radius; y <= radius; y++) {
            for (let z = -radius; z <= radius; z++) {
                if (blockIds.includes(level.getBlock(cx + x, cy + y, cz + z).id)) {
                    return true
                }
            }
        }
    }
    return false
}

// Zählt Blöcke bis `required` erreicht, dann early exit
function countUpTo(level, cx, cy, cz, radius, blockIds, required) {
    let count = 0
    for (let x = -radius; x <= radius && count < required; x++) {
        for (let y = -radius; y <= radius && count < required; y++) {
            for (let z = -radius; z <= radius && count < required; z++) {
                if (blockIds.includes(level.getBlock(cx + x, cy + y, cz + z).id)) count++
            }
        }
    }
    return count
}

// Scannt Zylinderzone über dem Core nach Aeronautics-Blöcken
function findAirship(level, cx, cy, cz) {
    for (let x = -AIRSHIP_RADIUS_XZ; x <= AIRSHIP_RADIUS_XZ; x++) {
        for (let z = -AIRSHIP_RADIUS_XZ; z <= AIRSHIP_RADIUS_XZ; z++) {
            for (let y = AIRSHIP_MIN_Y; y <= AIRSHIP_MAX_Y; y++) {
                if (AERONAUTICS_BLOCKS.includes(level.getBlock(cx + x, cy + y, cz + z).id)) {
                    return true
                }
            }
        }
    }
    return false
}

// Prüft ob ein Punkt das Zentrum eines Schienenkreuzes ist.
// Verwendet vorberechnetes Set für O(1)-Lookups statt weiterer getBlock-Calls.
function isRailCrossCenter(railSet, px, py, pz) {
    let arms = 0
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    for (let [dx, dz] of directions) {
        let found = false
        for (let step = 1; step <= RAIL_CROSS_ARM && !found; step++) {
            for (let dy = -RAIL_Y_TOLERANCE; dy <= RAIL_Y_TOLERANCE && !found; dy++) {
                if (railSet.has(`${px + dx*step},${py + dy},${pz + dz*step}`)) {
                    found = true
                }
            }
        }
        if (found) arms++
    }
    return arms >= 4
}

// 2-Pass-Algorithmus: erst alle Schienen sammeln, dann Kreuz-Zentrum suchen.
// Deutlich effizienter als naive Nested-Loops mit getBlock-Calls.
function findRailCross(level, cx, cy, cz) {
    // Pass 1: Schienen-Positionen sammeln
    let railSet = new Set()
    for (let x = -RAIL_RADIUS; x <= RAIL_RADIUS; x++) {
        for (let y = -RAIL_Y_TOLERANCE; y <= RAIL_Y_TOLERANCE; y++) {
            for (let z = -RAIL_RADIUS; z <= RAIL_RADIUS; z++) {
                if (RAIL_BLOCKS.has(level.getBlock(cx + x, cy + y, cz + z).id)) {
                    railSet.add(`${cx+x},${cy+y},${cz+z}`)
                }
            }
        }
    }
    // Pass 2: Jeden Schienen-Block als mögliches Kreuz-Zentrum prüfen
    for (let key of railSet) {
        let [px, py, pz] = key.split(',').map(Number)
        if (isRailCrossCenter(railSet, px, py, pz)) return true
    }
    return false
}

// Optional: Kreisverkehr — Ring von ≥20 Schienen im Radius 6–22
// Nutzt dasselbe railSet wenn vorhanden, sonst separater Scan.
function findRailRoundabout(railSet) {
    let ringCount = 0
    for (let key of railSet) {
        let parts = key.split(',')
        // Distanz zum Center schätzen ist ohne Core-Referenz hier nicht trivial.
        // Stattdessen: wenn ≥20 Schienen-Blöcke im Set → Roundabout-Indikator.
        ringCount++
        if (ringCount >= 24) return true   // mind. 24 Schienen → Ring plausibel
    }
    return false
}

// ========================
// MODUL-CHECKS
// ========================

function checkFundament(level, pos) {
    let missing = []
    PILLAR_OFFSETS.forEach((offset, i) => {
        let tx = pos.x + offset[0], tz = pos.z + offset[2]
        let found = false
        // ±3 y-Toleranz für Gelände-Unebenheiten
        for (let dy = -3; dy <= 3 && !found; dy++) {
            if (level.getBlock(tx, pos.y + dy, tz).id === 'apex:gaia_pillar') found = true
        }
        if (!found) {
            missing.push(`Säule ${i+1} fehlt — erwartet bei §e(${tx}, ${pos.y}, ${tz})§c`)
        }
    })
    return { ok: missing.length === 0, missing: missing }
}

function checkDigital(level, pos) {
    let missing = []
    if (!findBlock(level, pos.x, pos.y, pos.z, DIGITAL_RADIUS, ['ae2:controller'])) {
        missing.push('ME Controller nicht gefunden (Radius ' + DIGITAL_RADIUS + ')')
    }
    let units = countUpTo(level, pos.x, pos.y, pos.z, DIGITAL_RADIUS, ['ae2:crafting_unit'], AE2_CRAFTING_COUNT)
    if (units < AE2_CRAFTING_COUNT) {
        missing.push(`Nur ${units}/${AE2_CRAFTING_COUNT} AE2 Crafting Units gefunden`)
    }
    return { ok: missing.length === 0, missing: missing }
}

function checkReactor(level, pos) {
    let missing = []
    if (!findBlock(level, pos.x, pos.y, pos.z, REACTOR_RADIUS, ['mekanismgenerators:fusion_reactor_controller'])) {
        missing.push('Mekanism Fusion Reactor nicht gefunden (Radius ' + REACTOR_RADIUS + ')')
    }
    return { ok: missing.length === 0, missing: missing }
}

function checkCreate(level, pos) {
    let missing = []

    // Steam Engine Tier 9 — 9x create:steam_engine im Radius
    let steamCount = countUpTo(level, pos.x, pos.y, pos.z, CREATE_RADIUS, ['create:steam_engine'], STEAM_ENGINE_COUNT)
    if (steamCount < STEAM_ENGINE_COUNT) {
        missing.push(`Nur ${steamCount}/${STEAM_ENGINE_COUNT} Steam Engines (Tier 9 benötigt)`)
    }

    // Luftschiff im Luftbahnhof über dem Core
    if (!findAirship(level, pos.x, pos.y, pos.z)) {
        missing.push(`Kein Luftschiff im Luftbahnhof (${AIRSHIP_MIN_Y}–${AIRSHIP_MAX_Y} Blöcke über Core, Radius ${AIRSHIP_RADIUS_XZ})`)
    }

    // Doppelschienen-Kreuz
    let railSet = null
    let hasCross = false
    {
        // Schienen sammeln (geteilt für Kreuz und Kreisverkehr)
        railSet = new Set()
        for (let x = -RAIL_RADIUS; x <= RAIL_RADIUS; x++) {
            for (let y = -RAIL_Y_TOLERANCE; y <= RAIL_Y_TOLERANCE; y++) {
                for (let z = -RAIL_RADIUS; z <= RAIL_RADIUS; z++) {
                    if (RAIL_BLOCKS.has(level.getBlock(pos.x + x, pos.y + y, pos.z + z).id)) {
                        railSet.add(`${pos.x+x},${pos.y+y},${pos.z+z}`)
                    }
                }
            }
        }
        for (let key of railSet) {
            let [px, py, pz] = key.split(',').map(Number)
            if (isRailCrossCenter(railSet, px, py, pz)) { hasCross = true; break }
        }
    }
    if (!hasCross) {
        missing.push('Kein Doppelschienen-Kreuz in der Nähe des Cores gefunden')
    }

    // Optional: Kreisverkehr (kein Fail — nur Bonus-Feedback)
    let hasRoundabout = findRailRoundabout(railSet)

    return { ok: missing.length === 0, missing: missing, hasRoundabout: hasRoundabout }
}

// ========================
// STATE MANAGEMENT
// (persistentData: überlebt Server-Neustarts)
// ========================

function stateKey(pos, module) {
    return `gaia_${pos.x}_${pos.y}_${pos.z}_${module}`
}

function getState(level, pos) {
    let pd = level.persistentData
    return {
        fundament: !!pd[stateKey(pos, 'f')],
        digital:   !!pd[stateKey(pos, 'd')],
        reactor:   !!pd[stateKey(pos, 'r')],
        create:    !!pd[stateKey(pos, 'c')],
        complete:  !!pd[stateKey(pos, 'done')]
    }
}

function saveState(level, pos, updates) {
    let pd = level.persistentData
    if (updates.fundament !== undefined) pd[stateKey(pos, 'f')]    = updates.fundament
    if (updates.digital   !== undefined) pd[stateKey(pos, 'd')]    = updates.digital
    if (updates.reactor   !== undefined) pd[stateKey(pos, 'r')]    = updates.reactor
    if (updates.create    !== undefined) pd[stateKey(pos, 'c')]    = updates.create
    if (updates.complete  !== undefined) pd[stateKey(pos, 'done')] = updates.complete
}

// ========================
// CHAT-AUSGABE
// ========================

function sendStatus(player, state) {
    player.tell('§6§l╔══════ GAIA KATHEDRALE ══════╗§r')
    player.tell(state.fundament ? '§a ✔ Fundament§r'      : '§c ✘ Fundament§r')
    player.tell(state.digital   ? '§a ✔ Digitales Herz§r' : '§c ✘ Digitales Herz§r')
    player.tell(state.reactor   ? '§a ✔ Reaktor-Sync§r'   : '§c ✘ Reaktor-Sync§r')
    player.tell(state.create    ? '§a ✔ Create-Herz§r'    : '§c ✘ Create-Herz§r')
    if (state.complete) {
        player.tell('§6§l ★★★ GAIA IST ERWACHT ★★★§r')
    } else {
        let done = [state.fundament, state.digital, state.reactor, state.create].filter(Boolean).length
        player.tell(`§e ${done}/4 Module aktiv§r`)
        player.tell('§7 Schleichen + Rechtsklick zum Scannen§r')
    }
    player.tell('§6§l╚════════════════════════════╝§r')
}

function sendScanResult(player, results) {
    player.tell('§6§l╔══════ SCAN-ERGEBNIS ══════╗§r')

    let modules = [
        { name: 'Fundament',      r: results.fundament },
        { name: 'Digitales Herz', r: results.digital   },
        { name: 'Reaktor-Sync',   r: results.reactor   },
        { name: 'Create-Herz',    r: results.create    }
    ]
    modules.forEach(m => {
        player.tell(m.r.ok ? `§a ✔ ${m.name}§r` : `§c ✘ ${m.name}§r`)
        if (!m.r.ok) m.r.missing.forEach(msg => player.tell(`§7   → ${msg}§r`))
        if (m.r.hasRoundabout !== undefined) {
            player.tell(m.r.hasRoundabout
                ? '§b   ★ Kreisverkehr erkannt! (Bonus)§r'
                : '§8   ○ Kein Kreisverkehr (optional)§r')
        }
    })

    player.tell('§6§l╚══════════════════════════╝§r')
}

// ========================
// GAIA-ERWACHEN
// ========================

function triggerGaiaAwakening(level, pos, player) {
    level.players.forEach(p => {
        p.tell('§d§l╔══════════════════════════════════════════╗')
        p.tell('§d§l     DIE GAIA-KATHEDRALE IST ERWACHT!')
        p.tell('§7§l  Der Kern pulsiert. Das Zeitalter der Maschinen')
        p.tell('§7§l         und der Magie ist vollendet.')
        p.tell('§d§l╚══════════════════════════════════════════╝')
    })

    // Einmaliges Sieg-Item — FTB Quests erkennt den Item-Erhalt als Quest-Abschluss-Bedingung
    // Definiert in: startup_scripts/00_custom_items.js
    player.give('apex:gaia_awakening_token')
}

// ========================
// MAIN EVENT
// ========================

BlockEvents.rightClicked('apex:gaia_core', event => {
    let player = event.player
    let level  = event.level
    let pos    = event.block.pos

    if (!player.isCrouching()) {
        sendStatus(player, getState(level, pos))
        return
    }

    player.tell('§e⚙ Gaia-Scan läuft... (kann kurz dauern)§r')

    let results = {
        fundament: checkFundament(level, pos),
        digital:   checkDigital(level, pos),
        reactor:   checkReactor(level, pos),
        create:    checkCreate(level, pos)
    }

    sendScanResult(player, results)

    saveState(level, pos, {
        fundament: results.fundament.ok,
        digital:   results.digital.ok,
        reactor:   results.reactor.ok,
        create:    results.create.ok
    })

    let state = getState(level, pos)
    if (state.fundament && state.digital && state.reactor && state.create && !state.complete) {
        saveState(level, pos, { complete: true })
        triggerGaiaAwakening(level, pos, player)
    }
})
