# Server Setup — APEX Modpack

> Letzte Aktualisierung: 2026-04-30 | Version: 0.1.x

## Voraussetzungen

- Java 21 (empfohlen: Eclipse Temurin 21 — https://adoptium.net)
- Mindestens 8 GB RAM für den Server-Prozess
- Linux (Ubuntu 22.04+) oder Windows Server 2019+
- Port 25565 TCP/UDP im Router freigegeben

## 1. NeoForge Server installieren

NeoForge 1.21.1 Installer herunterladen von:
https://projects.neoforged.net/neoforged/neoforge → neueste stabile Version für 1.21.1

```bash
# Server-Verzeichnis anlegen
mkdir apex-server && cd apex-server

# NeoForge Server installieren
java -jar neoforge-21.1.x-installer.jar --install-server .

# EULA akzeptieren (Pflicht)
echo "eula=true" > eula.txt
```

## 2. Startskript einrichten

Datei `start.sh` erstellen:

```bash
#!/bin/bash
java -Xmx8G -Xms4G \
  -XX:+UseG1GC \
  -XX:+ParallelRefProcEnabled \
  -XX:MaxGCPauseMillis=200 \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+DisableExplicitGC \
  -jar libraries/net/neoforged/neoforge/21.1.x/neoforge-21.1.x-server.jar nogui
```

```bash
chmod +x start.sh
```

## 3. Modpack deployen

Mods, Config und KubeJS aus dem Repository in den Server-Ordner kopieren:

```bash
# Aus dem Repo-Root ausführen
cp -r config/   apex-server/config/
cp -r kubejs/   apex-server/kubejs/
```

Alle Mod-JARs aus dem Modrinth mrpack in `apex-server/mods/` ablegen.

> Alternativ: mrpack mit dem NeoForge Installer direkt importieren (falls unterstützt)
> oder Packwiz: `packwiz server install` im Server-Verzeichnis ausführen.

## 4. server.properties konfigurieren

```properties
max-players=10
view-distance=12
simulation-distance=8
online-mode=true
difficulty=normal
spawn-protection=0
level-seed=
```

> `level-seed` leer lassen für zufälligen Seed, oder einen festen Seed eintragen.
> **Wichtig:** Seed nach Welt-Erstellung dokumentieren — kann nicht mehr geändert werden.

## 5. Erster Start

```bash
./start.sh
```

Warten bis in der Konsole erscheint:
```
[Server thread/INFO]: Done (Xs)! For help, type "help"
```

Fehler im Log prüfen:
```bash
grep -i "error\|exception\|crash" logs/latest.log
```

KubeJS-Fehler separat prüfen:
```bash
cat logs/kubejs/server.log | grep -i "error"
```

## 6. Chunky Pre-Gen ausführen

**Vor dem ersten Spieler-Join ausführen!** (Verhindert Lag beim Erkunden)

In der Server-Konsole eingeben:

```
chunky world minecraft:overworld
chunky center 0 0
chunky radius 3000
chunky shape square
chunky start
```

Status überwachen:
```
chunky progress
```

> Pre-Gen dauert je nach Hardware 30–90 Minuten.
> Server bleibt dabei spielbar, aber Chunk-Generierungs-Lag ist möglich.
> Empfehlung: Pre-Gen vor dem Gruppen-Launch abschließen.

Nether nach Overworld:
```
chunky world minecraft:the_nether
chunky center 0 0
chunky radius 1500
chunky shape square
chunky start
```

## 7. Verbindungstest

Alle 5 Spieler verbinden sich gleichzeitig und führen folgende Checks durch:

- [ ] Verbindung funktioniert (kein Timeout)
- [ ] TPS ≥ 18 (`/tps` in der Konsole — Wert unter 18 = Performance-Problem)
- [ ] World Gen sichtbar: Terralith-Biome erkennbar, Welthöhe > 400 Blöcke (`F3`)
- [ ] FTB Quests öffnet sich (`M` oder Quest-Taste)
- [ ] Keine roten Fehler in `logs/latest.log`

## Bekannte Tücken

| Problem | Ursache | Lösung |
|---------|---------|--------|
| Server startet nicht | Falscher Java-Pfad | `java -version` prüfen — muss Java 21 sein |
| KubeJS Errors | Script-Fehler | `logs/kubejs/server.log` prüfen, Syntax in `kubejs/` korrigieren |
| Tectonic greift nicht | Config falsch gelesen | Im Spiel `F3` → Max Y prüfen; Config-Keys in `logs/latest.log` suchen |
| Chunky startet nicht | Mod nicht geladen | `/chunky` eingeben — `Unknown command` = Mod fehlt |
| Niedrige TPS | Zu viele Entities/Chunks | `simulation-distance` auf 6 reduzieren |
