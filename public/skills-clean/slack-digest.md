# Slack Digest — Morning channel scan

Scan your key Slack channels and surface only what matters from the past 24 hours.

## Setup — Customize before using

Replace the placeholders below with your actual Slack handles and channels:

```
YOUR_SLACK_ID: [your Slack user ID, e.g. U01ABC123]
YOUR_HANDLE: [your username, e.g. yourname]
CHANNELS: [list the channels you want scanned]
```

---

## Step 1 — Scan for direct mentions (run all three)

These catch different types of mentions — run all three in parallel:

- `<@YOUR_SLACK_ID> after:YESTERDAY` — inline @-mentions in messages
- `to:YOUR_HANDLE after:YESTERDAY` — DMs and group DMs directed at you
- `mentions:YOUR_HANDLE after:YESTERDAY` — channel-level mentions

## Step 2 — Scan key channels

Search each of your important channels for activity in the past 24 hours:

- `in:[channel-1] after:YESTERDAY`
- `in:[channel-2] after:YESTERDAY`
- `in:[channel-3] after:YESTERDAY`

Replace with the channels most relevant to your work.

## Step 3 — Format the digest

Present results in this structure:

```
MENTIONS OF YOU
[Direct tags first — these are the most actionable]
• #channel — @person — one-line summary of what they need

CHANNEL ACTIVITY
• #channel — @person — one-line summary
```

## Rules
- Show direct mentions FIRST — they require action
- Skip bot noise (Jira updates, automated alerts) unless directly relevant to your work
- Skip channels with nothing relevant — don't list them as "no activity"
- One line per thread — if you need to follow up, flag it
- Keep it scannable — this is a morning brief, not a report
