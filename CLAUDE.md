# Minecraft Modpack Project — Claude Instructions

## Projektübersicht
Dieses Modpack wird für Freunde entwickelt und auf **Modrinth** veröffentlicht.
Es enthält kuratierte Mods, eigene Quests (FTB Quests) und Custom Crafting Rezepte (KubeJS).

## Verzeichnisstruktur
```
docs/               → Konzept, Mod-Liste, Progression, Balancing-Notizen
planning/           → Planungsdokumente (Mods, Quests, Rezepte, Progression)
src/                → Modpack-Quellcode
  config/           → Mod-Konfigurationen
  kubejs/           → Custom Rezepte & Gameplay-Skripte
  quests/           → FTB Quests Daten
  resourcepacks/    → Eigene Ressourcen
ai-workflows/
  prompts/          → Wiederverwendbare Prompts für lokale/Cloud-KI
  scripts/          → Automatisierungsskripte (Gemma-Agent, API-Calls)
  outputs/          → KI-generierte Entwürfe (müssen reviewt werden!)
tools/              → Hilfsskripte, Modpack-Tools
modrinth/           → Modrinth-Paketierung (mrpack-Manifest)
```

## KI-Workflow
- **Claude** (Orchestrator): Initiale Planung, Architektur-Entscheidungen, Qualitätskontrolle komplexer Inhalte
- **Gemma4 E4B lokal** (via Ollama): Bulk-Content-Generierung (Quest-Texte, Beschreibungen, Rezept-Ideen)
- **Gemini** (Cloud, bei Bedarf): Große Kontextfenster, Cross-Referenz-Checks

## Wichtige Konventionen
- **Minecraft-Version & Loader**: In `docs/concept.md` festgelegt (noch auszufüllen)
- **Mod-Loader**: Fabric bevorzugt (wegen Performance-Mods), alternativ NeoForge
- **Quest-Tool**: FTB Quests
- **Custom Rezepte**: KubeJS
- **Mod-Manifest**: Modrinth `modrinth.json` (kein direkte JAR-Verwaltung im Repo)

## Workflow-Phasen
1. **Konzept** — Thema, Version, Loader, Progression-Ziele (mit Claude)
2. **Mod-Kuration** — Liste erstellen, Kompatibilität prüfen (mit Claude)
3. **Balancing-Design** — Progression-Baum & Rezept-Anpassungen planen (mit Claude)
4. **Content-Generierung** — Quest-Texte, Beschreibungen via Gemma lokal
5. **Review** — Claude/Gemini prüfen KI-generierten Content
6. **Implementierung** — KubeJS-Skripte, Quest-Daten, Configs
7. **Testing** — Lokaler Server, Multiplayer-Test mit Freunden
8. **Publishing** — Modrinth mrpack, Beschreibung, Screenshots

## Hinweise für Claude
- Vorschläge für Mods immer mit CurseForge/Modrinth-Verfügbarkeit begründen
- Auf Kompatibilität zwischen Mods achten (insb. API-Konflikte)
- KubeJS-Code direkt in `src/kubejs/` erstellen
- Gemma-Prompts in `ai-workflows/prompts/` als Markdown-Dateien speichern
- Outputs immer in `ai-workflows/outputs/` ablegen, nie direkt in `src/`
