<!-- keywords: find-session, find session, search sessions, past threads, recall, where did I, which session -->
# Find a past Claude Code session

Search across past Claude Code sessions on disk by keyword and return the matches with resume commands.

Input: $ARGUMENTS — one or more keywords (AND-matched, case-insensitive). May include flags supported by the underlying tool (`-p PROJECT`, `-d DAYS`, `-a`, `-n LIMIT`, `-r`).

---

## Step 1 — Run the search tool

Execute the `find-session` tool at `~/work/tools/find-session` with the user's arguments. Use Bash:

```
~/work/tools/find-session $ARGUMENTS
```

If `$ARGUMENTS` is empty, ask the user what topic / keywords they want to search for. Don't guess.

## Step 2 — Present the results

Show the raw output from the tool. For each hit, the user gets:
- date / project / short session id
- the first user prompt of that session (so they recognize it)
- a snippet showing the keyword in context
- the exact `claude --resume <id>` command to jump back in

If there are zero results:
- Suggest: removing flags, broadening with `-a` (all-time) or `-d 365`, swapping to fewer / different keywords.
- Don't fabricate sessions or guess what they were looking for.

## Step 3 — Help them act on it

After showing results, ask which session they want to resume — or if they want to refine the search. Don't auto-resume.

## Reference

Tool source: `~/work/tools/find-session`
Searches: `~/.claude/projects/<slug>/*.jsonl` (every Claude Code session is stored there)
Memory pointer: `reference_find_session_tool.md`
