#!/usr/bin/env python3
"""
Review-Script — Claude/Gemini API für Qualitätskontrolle von Gemma-Outputs
Liest generierte Inhalte aus outputs/ und prüft sie via Cloud-API.

Nutzt Claude API (via anthropic SDK) oder Gemini (via google-generativeai).
"""

import json
import os
from pathlib import Path

# --- Claude Review ---
def review_with_claude(items: list[dict], field: str = "generated_text") -> list[dict]:
    try:
        import anthropic
    except ImportError:
        print("pip install anthropic")
        return items

    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
    results = []

    for item in items:
        text = item.get(field, "")
        msg = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=1024,
            messages=[{
                "role": "user",
                "content": (
                    f"Bewerte folgenden Minecraft Modpack Quest-Text auf einer Skala 1-10.\n"
                    f"Kriterien: Lore-Qualität, Informationsgehalt, Lesbarkeit, Länge.\n"
                    f"Antworte mit JSON: {{\"score\": X, \"feedback\": \"...\", \"improved\": \"...\"}}\n\n"
                    f"Text:\n{text}"
                )
            }]
        )
        try:
            review = json.loads(msg.content[0].text)
        except Exception:
            review = {"score": None, "feedback": msg.content[0].text, "improved": ""}
        results.append({**item, "review": review})

    return results


# --- Gemini Review ---
def review_with_gemini(items: list[dict], field: str = "generated_text") -> list[dict]:
    try:
        import google.generativeai as genai
    except ImportError:
        print("pip install google-generativeai")
        return items

    genai.configure(api_key=os.environ["GEMINI_API_KEY"])
    model = genai.GenerativeModel("gemini-2.5-pro")
    results = []

    for item in items:
        text = item.get(field, "")
        response = model.generate_content(
            f"Bewerte diesen Minecraft Quest-Text (1-10) und verbessere ihn.\n"
            f"Antworte mit JSON: {{\"score\": X, \"feedback\": \"...\", \"improved\": \"...\"}}\n\n"
            f"Text:\n{text}"
        )
        try:
            review = json.loads(response.text)
        except Exception:
            review = {"score": None, "feedback": response.text, "improved": ""}
        results.append({**item, "review": review})

    return results


if __name__ == "__main__":
    import sys
    input_file = Path(sys.argv[1]) if len(sys.argv) > 1 else None
    if not input_file or not input_file.exists():
        print("Usage: python3 review-outputs.py <path-to-generated.json> [claude|gemini]")
        sys.exit(1)

    backend = sys.argv[2] if len(sys.argv) > 2 else "claude"
    with open(input_file, encoding="utf-8") as f:
        items = json.load(f)

    if backend == "gemini":
        reviewed = review_with_gemini(items)
    else:
        reviewed = review_with_claude(items)

    out = input_file.with_suffix(".reviewed.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(reviewed, f, ensure_ascii=False, indent=2)
    print(f"Review gespeichert in: {out}")
