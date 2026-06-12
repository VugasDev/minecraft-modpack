"""SNBT generation library for FTB Quests chapters (FTB Quests 2101 format)."""

# ── ID scheme ────────────────────────────────────────────────────────────────
# Groups:   0x20000..0x60000 (T1..T5)
# Chapters: group + 0x1000 * n   (e.g. 0x21000 = first T1 chapter)
# Quests:   chapter + n          (e.g. 0x21001)
# Tasks:    quest id with first hex digit 1..9
# Rewards:  quest id with first hex digit A..F

GROUPS = [
    ("T1", 0x20000, "Tier 1: The Beginning"),
    ("T2", 0x30000, "Tier 2: Brass and Machines"),
    ("T3", 0x40000, "Tier 3: Energy and Automation"),
    ("T4", 0x50000, "Tier 4: Advanced Systems"),
    ("T5", 0x60000, "Tier 5: Endgame"),
]

# filled by register_chapter(); key -> dict
CHAPTERS = {}


def register_chapter(key, base, group, order, title, icon, quests):
    CHAPTERS[key] = {
        "key": key, "base": base, "group": group, "order": order,
        "title": title, "icon": icon, "quests": quests,
    }


def esc(s):
    """SNBT string escaping: & must become \\& in FTB Quests."""
    return s.replace("&", "\\&")


def hexid(value):
    return f"{value:016X}"


def quest_id(chapter_key, n):
    return hexid(CHAPTERS[chapter_key]["base"] + n)


def sub_id(qid, prefix_digit, i):
    """Derive a unique task/reward id from a quest id."""
    return f"{prefix_digit + i:X}" + qid[1:]


# ── task / reward shorthands ─────────────────────────────────────────────────

def I(item, count=1):
    return ("item", item, count)

def K(entity, count=1):
    return ("kill", entity, count)

def CK(title):
    return ("checkmark", title, 0)

def R(item, count=1):
    return ("item", item, count)

def XP(amount):
    return ("xp", amount, 0)

def LV(levels):
    return ("xp_levels", levels, 0)


# ── SNBT emitters ────────────────────────────────────────────────────────────

def emit_task(qid, i, task):
    tid = sub_id(qid, 0x1, i)
    kind, a, b = task
    if kind == "item":
        return (f'\t\t\t\t{{\n'
                f'\t\t\t\t\tcount: {b}L\n'
                f'\t\t\t\t\tid: "{tid}"\n'
                f'\t\t\t\t\titem: "{a}"\n'
                f'\t\t\t\t\ttype: "item"\n'
                f'\t\t\t\t}}')
    if kind == "kill":
        return (f'\t\t\t\t{{\n'
                f'\t\t\t\t\tentity: "{a}"\n'
                f'\t\t\t\t\tid: "{tid}"\n'
                f'\t\t\t\t\ttype: "kill"\n'
                f'\t\t\t\t\tvalue: {b}L\n'
                f'\t\t\t\t}}')
    if kind == "checkmark":
        return (f'\t\t\t\t{{\n'
                f'\t\t\t\t\tid: "{tid}"\n'
                f'\t\t\t\t\ttitle: "{esc(a)}"\n'
                f'\t\t\t\t\ttype: "checkmark"\n'
                f'\t\t\t\t}}')
    raise ValueError(kind)


def emit_reward(qid, i, reward):
    rid = sub_id(qid, 0xA, i)
    kind, a, b = reward
    if kind == "item":
        return (f'\t\t\t\t{{\n'
                f'\t\t\t\t\tcount: {b}L\n'
                f'\t\t\t\t\tid: "{rid}"\n'
                f'\t\t\t\t\titem: "{a}"\n'
                f'\t\t\t\t\ttype: "item"\n'
                f'\t\t\t\t}}')
    if kind == "xp":
        return (f'\t\t\t\t{{\n'
                f'\t\t\t\t\tid: "{rid}"\n'
                f'\t\t\t\t\ttype: "xp"\n'
                f'\t\t\t\t\txp: {a}\n'
                f'\t\t\t\t}}')
    if kind == "xp_levels":
        return (f'\t\t\t\t{{\n'
                f'\t\t\t\t\tid: "{rid}"\n'
                f'\t\t\t\t\ttype: "xp_levels"\n'
                f'\t\t\t\t\txp_levels: {a}\n'
                f'\t\t\t\t}}')
    raise ValueError(kind)


def resolve_dep(chapter_key, dep):
    """dep is an int (same chapter) or ('chapter_key', n) tuple."""
    if isinstance(dep, tuple):
        return quest_id(dep[0], dep[1])
    return quest_id(chapter_key, dep)


def emit_quest(chapter_key, q):
    qid = quest_id(chapter_key, q["n"])
    out = ["\t\t{"]
    deps = [resolve_dep(chapter_key, d) for d in q.get("deps", [])]
    if deps:
        out.append("\t\t\tdependencies: [")
        for d in deps:
            out.append(f'\t\t\t\t"{d}"')
        out.append("\t\t\t]")
    desc = q.get("desc", [])
    if desc:
        out.append("\t\t\tdescription: [")
        for line in desc:
            out.append(f'\t\t\t\t"{esc(line)}"')
        out.append("\t\t\t]")
    if "icon" in q:
        out.append(f'\t\t\ticon: "{q["icon"]}"')
    out.append(f'\t\t\tid: "{qid}"')
    if q.get("optional"):
        out.append("\t\t\toptional: true")
    rewards = q.get("rewards", [])
    if rewards:
        out.append("\t\t\trewards: [")
        for i, r in enumerate(rewards):
            out.append(emit_reward(qid, i, r))
        out.append("\t\t\t]")
    if "shape" in q:
        out.append(f'\t\t\tshape: "{q["shape"]}"')
    if "sub" in q:
        out.append(f'\t\t\tsubtitle: "{esc(q["sub"])}"')
    tasks = q.get("tasks", [])
    out.append("\t\t\ttasks: [")
    for i, t in enumerate(tasks):
        out.append(emit_task(qid, i, t))
    out.append("\t\t\t]")
    out.append(f'\t\t\ttitle: "{esc(q["title"])}"')
    out.append(f'\t\t\tx: {q["x"]}d')
    out.append(f'\t\t\ty: {q["y"]}d')
    out.append("\t\t}")
    return "\n".join(out)


def emit_chapter(key):
    ch = CHAPTERS[key]
    group_id = hexid(ch["group"])
    out = ["{"]
    out.append("\tdefault_hide_dependency_lines: false")
    out.append('\tdefault_quest_shape: ""')
    out.append(f'\tfilename: "{key}"')
    out.append(f'\tgroup: "{group_id}"')
    out.append(f'\ticon: "{ch["icon"]}"')
    out.append(f'\tid: "{hexid(ch["base"])}"')
    out.append(f'\torder_index: {ch["order"]}')
    out.append("\tquest_links: [ ]")
    out.append("\tquests: [")
    for q in ch["quests"]:
        out.append(emit_quest(key, q))
    out.append("\t]")
    out.append(f'\ttitle: "{esc(ch["title"])}"')
    out.append("}")
    return "\n".join(out) + "\n"


def emit_chapter_groups():
    out = ["{", "\tchapter_groups: ["]
    for _, base, title in GROUPS:
        out.append(f'\t\t{{ id: "{hexid(base)}", title: "{esc(title)}" }}')
    out.append("\t]")
    out.append("}")
    return "\n".join(out) + "\n"


def validate():
    """Sanity checks: unique quest numbers, resolvable deps, positions set."""
    errors = []
    for key, ch in CHAPTERS.items():
        seen = set()
        for q in ch["quests"]:
            if q["n"] in seen:
                errors.append(f"{key}: duplicate quest n={q['n']}")
            seen.add(q["n"])
        for q in ch["quests"]:
            for d in q.get("deps", []):
                if isinstance(d, tuple):
                    tgt_key, tgt_n = d
                    if tgt_key not in CHAPTERS:
                        errors.append(f"{key}/{q['n']}: unknown chapter dep {tgt_key}")
                        continue
                    nums = {x["n"] for x in CHAPTERS[tgt_key]["quests"]}
                    if tgt_n not in nums:
                        errors.append(f"{key}/{q['n']}: dep {tgt_key}/{tgt_n} missing")
                else:
                    if d not in seen:
                        errors.append(f"{key}/{q['n']}: local dep {d} missing")
    return errors
