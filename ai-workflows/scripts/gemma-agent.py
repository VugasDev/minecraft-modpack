#!/usr/bin/env python3
"""
Gemma4 E4B Local Agent — via Ollama
Für Bulk-Generierung von Quest-Texten, Beschreibungen etc.

Setup:
  1. Ollama installieren: https://ollama.com
  2. Modell laden: ollama pull gemma3:4b  (oder gemma2:9b je nach VRAM)
  3. Script ausführen: python3 gemma-agent.py

RTX 4070 (12GB VRAM): gemma3:4b läuft komfortabel
"""

import json
import requests
from pathlib import Path

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "gemma3:4b"  # Anpassen falls anderer Gemma4-Variant
OUTPUT_DIR = Path(__file__).parent.parent / "outputs"


def generate(prompt: str, system: str = "", temperature: float = 0.7) -> str:
    payload = {
        "model": MODEL,
        "prompt": prompt,
        "system": system,
        "stream": False,
        "options": {
            "temperature": temperature,
            "num_predict": 512,
        }
    }
    resp = requests.post(OLLAMA_URL, json=payload, timeout=120)
    resp.raise_for_status()
    return resp.json()["response"].strip()


def batch_quest_generation(quests: list[dict], output_file: str = "quests/generated.json") -> None:
    """
    Generiert Quest-Texte für eine Liste von Quest-Definitionen.

    quests = [
        {"title": "Erste Schritte", "mod": "Create", "context": "...", "tone": "technisch"},
        ...
    ]
    """
    system = (
        "Du bist ein Autor für ein Minecraft Modpack. Schreibe kurze Quest-Texte "
        "(max. 3 Sätze) die Lore und hilfreiche Hinweise kombinieren. "
        "Antworte NUR mit dem Quest-Text, ohne Erklärungen."
    )

    results = []
    for i, quest in enumerate(quests):
        print(f"[{i+1}/{len(quests)}] Generiere: {quest['title']}...")
        prompt = (
            f"Quest: {quest['title']}\n"
            f"Mod: {quest.get('mod', 'Minecraft')}\n"
            f"Kontext: {quest.get('context', '')}\n"
            f"Ton: {quest.get('tone', 'neutral')}"
        )
        text = generate(prompt, system=system)
        results.append({**quest, "generated_text": text})
        print(f"  → {text[:80]}...")

    out_path = OUTPUT_DIR / output_file
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"\nFertig! Outputs in: {out_path}")


def interactive():
    """Interaktiver Modus für einzelne Anfragen."""
    print(f"Gemma Agent ({MODEL}) — Interaktiver Modus")
    print("Tippe 'quit' zum Beenden.\n")
    while True:
        prompt = input("Prompt: ").strip()
        if prompt.lower() in ("quit", "exit", "q"):
            break
        if not prompt:
            continue
        print("\nAntwort:")
        print(generate(prompt))
        print()


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "batch":
        # Beispiel-Batch
        example_quests = [
            {
                "title": "Dein erstes Zahnrad",
                "mod": "Create",
                "context": "Spieler beginnt gerade mit Create",
                "tone": "technisch-begeistert"
            }
        ]
        batch_quest_generation(example_quests)
    else:
        interactive()
