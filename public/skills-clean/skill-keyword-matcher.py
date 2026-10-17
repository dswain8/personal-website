#!/usr/bin/env python3
"""
UserPromptSubmit hook: scans ~/.claude/commands/*.md for keyword metadata,
matches against the user's prompt, and injects a skill hint if relevant.

Each command file can declare keywords via an HTML comment:
  <!-- keywords: sql, query, snowflake, data analysis -->

The hook outputs a hint that gets injected as context before Claude processes
the message, nudging it to use the right skill automatically.

Install:
  1. Save this file to ~/.claude/scripts/skill-keyword-matcher.py
  2. chmod +x ~/.claude/scripts/skill-keyword-matcher.py
  3. Add this to ~/.claude/settings.json:

     "hooks": {
       "UserPromptSubmit": [
         {
           "hooks": [
             {
               "type": "command",
               "command": "python3 /Users/YOU/.claude/scripts/skill-keyword-matcher.py"
             }
           ]
         }
       ]
     }

  4. Drop your skill .md files into ~/.claude/commands/ with a keywords comment
     at the top, e.g.:
       <!-- keywords: weekly update, status report, friday update -->
"""

import json
import sys
import os
import re
from pathlib import Path


def extract_keywords(content: str) -> list[str]:
    """Extract keywords from <!-- keywords: ... --> comment in skill file."""
    match = re.search(r'<!--\s*keywords:\s*([^>]+?)-->', content, re.IGNORECASE | re.DOTALL)
    if not match:
        return []
    return [k.strip().lower() for k in match.group(1).split(',') if k.strip()]


def tokenize(text: str) -> set[str]:
    """Break text into lowercase word tokens."""
    return set(re.findall(r'[a-z]+', text.lower()))


def main():
    try:
        data = json.load(sys.stdin)
    except Exception:
        sys.exit(0)

    prompt = data.get("prompt", "")
    if not prompt:
        sys.exit(0)

    prompt_tokens = tokenize(prompt)
    commands_dir = Path.home() / ".claude" / "commands"
    if not commands_dir.exists():
        sys.exit(0)

    matched_skills = []

    for skill_file in sorted(commands_dir.glob("*.md")):
        try:
            content = skill_file.read_text()
        except Exception:
            continue

        keywords = extract_keywords(content)
        if not keywords:
            continue

        skill_name = skill_file.stem

        for kw in keywords:
            kw_tokens = tokenize(kw)
            if kw_tokens and kw_tokens.issubset(prompt_tokens):
                matched_skills.append((skill_name, kw))
                break  # one match per skill is enough

    if matched_skills:
        skill_list = ", ".join(f"/{name}" for name, _ in matched_skills)
        trigger_list = ", ".join(f'"{kw}"' for _, kw in matched_skills)
        hint = (
            f"\n[SKILL MATCH DETECTED]\n"
            f"The following skills match keywords in this request ({trigger_list}): {skill_list}\n"
            f"If this task falls within their scope, invoke the relevant skill automatically.\n"
        )
        print(hint, end="")

    sys.exit(0)


if __name__ == "__main__":
    main()
