# minecraft-modpack – Projekt-Kontext

## Beschreibung
Kuratiertes Minecraft-Modpack für Freunde, veröffentlicht auf Modrinth, mit eigenen Quests (FTB Quests) und Custom-Rezepten (KubeJS).

## Tech Stack
Minecraft (Fabric/NeoForge), KubeJS, FTB Quests, Modrinth (mrpack-Manifest), Ollama/Gemma (lokale KI für Content-Generierung).

## Verzeichnisstruktur
```
docs/               → Konzept, Mod-Liste, Progression, Balancing-Notizen
planning/           → Planungsdokumente (Mods, Quests, Rezepte, Progression)
src/
  config/           → Mod-Konfigurationen
  kubejs/           → Custom Rezepte & Gameplay-Skripte
  quests/           → FTB Quests Daten
  resourcepacks/    → Eigene Ressourcen
ai-workflows/
  prompts/          → Wiederverwendbare Prompts für lokale/Cloud-KI
  scripts/          → Automatisierungsskripte (Gemma-Agent, API-Calls)
  outputs/          → KI-generierte Entwürfe (müssen reviewt werden!)
modrinth/           → Modrinth-Paketierung (mrpack-Manifest)
```

## Zugriffe & Infrastruktur
Eigenständig — kein Homelab-Infrastruktur-Bezug.

## Entwicklungs-Regeln
- Vor komplexen Aufgaben: `~/projects/docs/common-mistakes.md` (Sektionen [ALLE] + [@code])
- Nur ändern was explizit angefragt wurde; Inputs validieren
- Mod-Vorschläge immer mit CurseForge/Modrinth-Verfügbarkeit begründen
- Auf Kompatibilität zwischen Mods achten (insb. API-Konflikte)
- KubeJS-Code direkt in `src/kubejs/` erstellen
- KI-Outputs immer in `ai-workflows/outputs/` ablegen, nie direkt in `src/`
- Keine Secrets oder API-Keys im Repo
