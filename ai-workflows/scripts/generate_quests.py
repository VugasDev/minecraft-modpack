import json
import re
import os

def parse_markdown_to_json(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Extract ID
    quest_id_match = re.search(r'- \*\*Quest-ID:\*\* `(.*?)`', content)
    quest_id = quest_id_match.group(1) if quest_id_match else "unknown"

    # Extract Title
    title_match = re.search(r'# Quest: .*? \((.*?)\)', content)
    title = title_match.group(1) if title_match else "Unknown Quest"
    
    # Extract Dependencies
    deps_match = re.search(r'- \*\*Dependencies:\*\* `(.*?)`', content)
    deps = [deps_match.group(1)] if deps_match else []

    # Extract Tasks
    tasks = []
    task_lines = re.findall(r'- \[ \] (.*)', content)
    for t in task_lines:
        tasks.append({"id": f"{quest_id}_task", "type": "item", "item": "minecraft:stone", "count": 1})

    # Extract Rewards
    rewards = []
    try:
        reward_lines = re.findall(r'- (.*)', content.split('## Belohnung')[1])
        for r in reward_lines:
            if r.strip():
                rewards.append({"id": f"{quest_id}_reward", "type": "item", "item": "minecraft:stone", "count": 1})
    except IndexError:
        pass

    json_data = {
        "id": quest_id,
        "title": title,
        "dependencies": deps,
        "tasks": tasks,
        "rewards": rewards
    }
    return json_data, quest_id

# Directory to scan recursively
base_input_dir = "/home/vugas/minecraft-modpack/planning/quests"
output_dir = "/home/vugas/minecraft-modpack/config/ftbquests/quests/chapters"

for root, dirs, files in os.walk(base_input_dir):
    for filename in files:
        if filename.endswith(".md") and "tier-" in root:
            data, qid = parse_markdown_to_json(os.path.join(root, filename))
            with open(os.path.join(output_dir, f"{qid}.json"), 'w') as f:
                json.dump(data, f, indent=2)
                print(f"Generated {qid}.json from {root}")
