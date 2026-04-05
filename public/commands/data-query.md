# Data Query — Write SQL from Natural Language

Translate plain-English questions into production-ready SQL queries for your data warehouse.

## Setup — Before using this command

Edit this file to add your schema reference:

```
SCHEMA FILE: /path/to/your/schema-reference.md
DATABASE: Snowflake / BigQuery / Postgres / etc.
```

The schema reference should contain table names, column names, relationships, and common query patterns. Always consult it before writing a query.

---

## Step 1 — Load the schema

Read your schema reference file before writing any SQL. If you don't have one, ask the user to describe the relevant tables and columns.

## Step 2 — Understand the request

The user's request: $ARGUMENTS

Parse the natural language question to identify:
- **What metric or data** they want
- **What filters** apply (date range, status, entity, etc.)
- **What aggregation or shape** they need (raw rows, totals, grouped, time-series, etc.)

## Step 3 — Apply good practices (always)

```sql
-- Exclude test/internal records where relevant
-- Filter soft-deleted records: AND NOT is_deleted (or equivalent)
-- Cast date fields correctly for your DB
-- Use CTEs for readability on complex queries
```

## Step 4 — Write the SQL

Output:
1. **The SQL query** — well-formatted, with comments explaining non-obvious logic
2. **Brief explanation** — what the query does, which tables it hits, any assumptions made
3. **Caveats** — anything the user should know
4. **Optional follow-up queries** — if a drill-down would be useful

## Example interactions

**User**: "Show me all active subscriptions"
→ Query subscriptions table where `status = 'ACTIVE'` and not deleted

**User**: "How much revenue did we generate last month by product?"
→ Aggregate revenue table by product, filter to last month, group and sum

**User**: "Find unpaid invoices over 30 days old"
→ Query invoices where payment status is unpaid and created_at is >30 days ago
