# Oncall Triage — Structured incident and ticket assessment

Triage a support ticket or incident and produce a structured assessment.

Input: $ARGUMENTS — a ticket ID (Jira, Linear, etc.), a Slack thread URL, or a description of the issue.

## Step 1 — Get the full context

- If a ticket ID is given, fetch it using the appropriate tool.
- If a Slack URL is given, fetch the thread.
- If described in free text, work with what's provided.
- Check relevant support channels for related threads if the ticket ID is known.

## Step 2 — Assess severity

| Level | Criteria |
|-------|----------|
| **P0** | Revenue impact, customers blocked from core functionality, data corruption |
| **P1** | Significant customer impact, broken workflows, incorrect charges or data |
| **P2** | Workflow degraded but workaround exists, delayed processing |
| **P3** | Minor issue, no immediate customer impact, ops friction |
| **P4** | Cosmetic, future improvement, low urgency |

## Step 3 — Identify the right owner

Map the issue area to the relevant team or individual in your org. Update this section with your team's DRI mapping:

| Issue area | Suggested DRI |
|------------|--------------|
| [Area 1]   | [Owner]       |
| [Area 2]   | [Owner]       |

## Step 4 — Output triage summary

```
Ticket: [ID or short description]
Severity: P0 / P1 / P2 / P3 / P4
Issue: [One sentence — what is broken]
Customer impact: [Who is affected and how]
Suggested owner: [Name + handle]
Next step: [What needs to happen first to move this forward]
Blockers: [Anything preventing resolution]
```

Save triage note to your oncall notes folder with today's date.

Do NOT post to Slack or update tickets without explicit approval.
