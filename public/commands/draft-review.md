# Draft Review — Communication tightener

Review any draft against sharp PM communication principles.

Input: $ARGUMENTS — paste the draft directly, or give a file path.

## What this checks for

1. **Buried lede** — Is the actual point in paragraph 2 or 3? Move it to sentence 1.
2. **Weak words** — Flag: "just", "maybe", "I think", "sort of", "kind of", "wanted to check", "I was wondering". Cut or rewrite.
3. **Missing recommendation** — Is a problem described without a proposed solution? Add one.
4. **No anti-sell** — Is something recommended without naming the tradeoff? Add it.
5. **Audience mismatch** — Is this written for the author instead of the reader? Reframe.
6. **Length** — If it can be said in fewer words, say it in fewer words.

## Output format

```
ORIGINAL ISSUES
[Numbered list of what's wrong and why]

REVISED DRAFT
[The full rewritten version]

WHAT CHANGED
[One line per change, principle cited]
```

## Quick scan mode

If you want a fast check without a full rewrite:
> "Quick scan only — flag issues, don't rewrite."

The model will return a bulleted issue list in under 60 seconds.
