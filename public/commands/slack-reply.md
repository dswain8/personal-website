# Slack Reply — Triage a thread, research, and draft a response

Analyze a Slack thread where you've been tagged, understand the context and what's being asked, research if needed, and draft a reply for approval.

Input: $ARGUMENTS — a Slack thread URL, a channel name + keyword/person, or a search query to find the thread.

---

## Step 1 — Find the thread

- If a Slack URL is given, extract channel ID and thread_ts and fetch the full thread.
- If a channel + keyword/person is given, search Slack to locate the thread, then fetch it.
- If a search query is given, search Slack with multiple variations to find the right thread.

If multiple threads match, list them and ask which one.

## Step 2 — Analyze the thread

Read the full thread and produce this structured analysis:

```
WHO TAGGED ME: [Name + role if known]
WHAT THEY'RE ASKING: [One clear sentence — what is being asked or expected of you]
CONTEXT: [2-3 sentences — what prompted this thread, who else is involved, what's already been discussed]
CURRENT STATUS: [Where the thread stands — is it waiting on you, already resolved, still in discussion?]
```

Present this first. Then proceed to Step 3.

## Step 3 — Determine response type

### A. I ALREADY KNOW THE ANSWER
- Draft the reply directly using domain knowledge and thread context.

### B. I NEED TO RESEARCH (code, tickets, docs, data)
- Research using available tools (Jira, codebase, docs, Slack).
- Summarize findings, then draft the reply.

### C. I NEED TO CREATE SOMETHING (mockup, spec, diagram)
- Identify what's needed and either create it inline or save it as a file.
- Reference the deliverable in the draft reply.

### D. I NEED YOUR INPUT FIRST
- Do NOT draft a reply yet. Present clear questions:

```
BEFORE I CAN DRAFT A REPLY, I NEED YOUR INPUT:

1. [Specific question]
2. [Specific question]
```

## Step 4 — Draft the Slack reply

Compose a reply that:
- Is written in your voice — direct, concise, appropriate to your seniority level
- Uses Slack mrkdwn formatting (bold with `*text*`)
- Tags relevant people with `@Name` where appropriate
- Is the right length — short if simple, structured if complex

Present the draft in a quoted block:

```
DRAFT REPLY (for thread in #channel-name):

[The reply text as it would appear in Slack]
```

## Step 5 — Wait for approval

Do NOT post to Slack. Wait to:
- Say "send it" → post the reply
- Give edits → revise and re-present
- Say "skip" → move on

---

## Rules
- NEVER post to Slack without explicit approval.
- If the thread is already resolved, say so and ask if you still want to reply.
- If tagged as FYI only, say so and ask if a reply is needed.
