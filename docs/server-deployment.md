# Server-Deployment — Gaia Awakening

> Konkretes Setup für den Multiplayer-Server. Ergänzt `server-setup.md` um
> die Welt-spezifischen Werte und den Pre-Gen-Workflow.

---

## Welt-Seed (FESTGELEGT)

```
1458109957658339347
```

In `server.properties` setzen:
```properties
level-seed=1458109957658339347
level-name=GaiaAwakening
level-type=minecraft\:normal
```

**Wichtig:** Der Seed alleine reproduziert die Welt nur, wenn alle World-Gen-Mods
exakt dieselbe Version + Config haben wie der Client der die Welt erstellt hat.
Tectonic, Terralith, Lithostitched, YUNG's, When Dungeons Arise, Mekanism-Ore-Gen
müssen identisch sein.

> Welt mit diesem Seed generiert am 2026-05-15 in Profil `gaia-awakening-0.1.30-alpha`
> ("New World (1)"). Bestätigt atemberaubende Terrain-Qualität mit aktueller Tectonic-Config.

---

## Tectonic-Config (Tall World)

Die echte Config ist `config/tectonic.json` (NICHT `tectonic-common.toml`).
Beim Server-Setup unbedingt die `tectonic.json` aus diesem Repo verwenden.

Aktiv: **Tall World Mode** (finalisiert mit Seed 1458109957658339347)
- `global_terrain.max_y = 512`
- `global_terrain.min_y = -128`
- `global_terrain.vertical_scale = 1.8`
- `global_terrain.elevation_boost = 1.0`
- `general.snow_start_offset = 512`
- `islands.enabled = true`
- `continents.flat_terrain_skew = -0.15`
- `continents.erosion_scale = 0.32`
- `continents.ridge_scale = 0.35`

---

## Pre-Gen-Chunks von Singleplayer übernehmen

Die aktuelle Singleplayer-Welt hat bereits einen Großteil des Spawn-Bereichs vorgeneriert.
Statt auf dem Server neu zu generieren, übernehmen wir die Region-Files direkt.

### Schritt 1: Welt-Backup (lokal)
Backup-Pfad: `/home/vugas/minecraft-backups/gaia-awakening-<timestamp>/New_World_1/`

Quell-Pfad (lokal): `C:\Users\larss\AppData\Roaming\ModrinthApp\profiles\gaia-awakening-0.1.30-alpha\saves\New World (1)\`

### Schritt 2: Auf Server kopieren
Auf dem Server-Host:
```bash
# Server-Welt-Verzeichnis (existiert noch nicht):
SERVER_DIR=/opt/gaia-awakening-server
mkdir -p "$SERVER_DIR/world"

# Wichtige Welt-Daten kopieren:
rsync -av --exclude='session.lock' \
    /pfad/zum/Backup/New_World_2/ \
    "$SERVER_DIR/world/"
```

Mit zu übertragen sind:
- `region/` — alle vorgenerierten Chunks (Overworld)
- `DIM-1/region/` — Nether
- `DIM1/region/` — End
- `level.dat` — Welt-Metadaten inkl. Seed
- `data/` — Welt-Daten (raids, random_sequences)
- `poi/` — Points of Interest (Villager-Workstations etc.)
- `entities/` — Entity-Daten

**NICHT übertragen:**
- `session.lock` — wird vom Server neu erstellt
- `playerdata/` — falls vorhanden, lieber neu (saubere Spieler-Starts)
- `ftbteams/`, `ftbchunks/`, `ftbquests/` — Teams/Claims sollen sauber starten
- `advancements/`, `stats/` — saubere Statistiken

### Schritt 3: Verifizieren
Nach Server-Start prüfen:
```
/seed   → muss 1458109957658339347 ergeben
```

Wenn der Seed übereinstimmt aber Chunks neu generieren statt geladen werden,
hat sich vermutlich eine Mod-Config geändert (Tectonic, Terralith, etc.) —
in dem Fall den vorgenerierten Bereich beim Spielen einfach nicht verlassen.

---

## Server-Performance-Konfiguration

### ServerCore (`config/servercore.json5`)
Existiert nach erstem Start. Wichtige Einstellungen:
- Async Chunk Loading: aktiviert lassen
- Async Entity Tracker: aktiviert lassen

### Mekanism
- Radiation: optional deaktivieren wenn Spieler vor Uran-Mining warnt
- Generators: Fusion Reactor min-Temp checken (config/mekanism-server.toml)

### Create
- Contraption-Limit erhöhen wenn Aeronautics-Lag droht
- `config/create-server.toml` → `kineticStats.maxContraptionEntities`

### Distant Horizons (LOD-Server-Modus)
DH bleibt auf dem Server **aktiv** — DH 2.x kann LODs zentral generieren und an
Clients streamen. Das spart jedem Spieler die lokale LOD-Generierung und liefert
identische Fernsicht für alle. Wichtige Server-Konfiguration:

**`config/distanthorizons.toml`** (nach erstem Start):
- `multiplayer.serverNetworking = true` (oder ähnliches Feld, exakter Name nach
  erstem Boot in der generierten Config prüfen)
- LOD-Render-Distanz: hoch setzen (z.B. 256 chunks) — der Server berechnet
  einmalig, alle Clients profitieren
- `worldGenerator.enableDistantGeneration = true` damit der Server LODs
  proaktiv erzeugt während des Pre-Gen

**Pre-Gen-Strategie für LODs:**
1. Chunky Pre-Gen läuft → erzeugt Vanilla-Chunks
2. DH läuft parallel/danach mit, generiert LODs für alle Chunky-Chunks
3. Spieler erhalten beim Login die LODs vom Server (kein eigener Compute nötig)

**Trade-off:** Save-Zeiten werden länger (LOD-Blobs sind groß), und Disk-Space
steigt deutlich (~2-3× vanilla Welt-Größe). Auf einem Server mit SSD und genug
Storage ist das aber das richtige Trade-off für Multiplayer-Komfort.

**Singleplayer-Workflow für mich (Vugas):** Bei langem "Saving World"-Screen
warten — DH schreibt LOD-Blobs. Notfalls Force-Quit (region/ ist bereits geschrieben).

---

## Vor dem Server-Launch — Checkliste

- [ ] Pack-Version finalisiert (aktuell: 0.1.21-alpha)
- [ ] Alle KubeJS-Skripte ohne Errors (`logs/kubejs/server.log` checken)
- [ ] Quests funktional (SNBT-Format!)
- [ ] Welt-Backup erstellt und verifiziert
- [ ] `server.properties` Seed gesetzt
- [ ] Pre-Gen-Chunks rsync'd
- [ ] Firewall: Port 25565 (oder gewählter Port) offen
- [ ] Whitelist konfiguriert (`whitelist.json`)
- [ ] Op-Liste konfiguriert (`ops.json`)
- [ ] Test-Login mit Standard-User vor Freigabe
