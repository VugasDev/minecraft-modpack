#!/usr/bin/env python3
"""Generate all FTB Quests chapter SNBT files for Gaia Awakening.

Usage: python3 tools/generate_quests.py
Writes to config/ftbquests/quests/chapters/ and chapter_groups.snbt.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "questgen"))

import lib
import t1, t2, t3, t4, t5  # noqa: F401  (registration side effects)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUESTS = os.path.join(ROOT, "config", "ftbquests", "quests")
CHAPTERS = os.path.join(QUESTS, "chapters")


def main():
    errors = lib.validate()
    if errors:
        for e in errors:
            print(f"ERROR: {e}")
        sys.exit(1)

    os.makedirs(CHAPTERS, exist_ok=True)

    total = 0
    for key in lib.CHAPTERS:
        path = os.path.join(CHAPTERS, f"{key}.snbt")
        with open(path, "w") as f:
            f.write(lib.emit_chapter(key))
        n = len(lib.CHAPTERS[key]["quests"])
        total += n
        print(f"  {key}.snbt  ({n} quests)")

    with open(os.path.join(QUESTS, "chapter_groups.snbt"), "w") as f:
        f.write(lib.emit_chapter_groups())
    print("  chapter_groups.snbt")

    n_opt = sum(1 for ch in lib.CHAPTERS.values()
                for q in ch["quests"] if q.get("optional"))
    print(f"\nDone: {len(lib.CHAPTERS)} chapters, {total} quests ({n_opt} optional side quests).")


if __name__ == "__main__":
    main()
