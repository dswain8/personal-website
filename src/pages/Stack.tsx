import { useScrollReveal } from '../hooks/useScrollReveal'

const sections = [
  {
    id: 'voice',
    label: 'Voice & Input',
    description: 'How I get words out fast without typing everything.',
    tools: [
      {
        name: 'Wispr Flow',
        what: 'Voice dictation that works everywhere on Mac. I speak, it types — Slack messages, specs, emails, prompts. Faster than typing and closer to how I actually think.',
        url: 'https://www.wispr.ai',
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Building',
    description: 'The tools I use to code, research, write, and ship.',
    tools: [
      {
        name: 'Claude Code',
        what: 'My primary environment. Agentic coding, Slack research, SQL, feature specs, DACI docs, weekly updates — most of what\'s on the Build page runs through this. It\'s not just a coding tool; it\'s where work happens.',
        url: 'https://claude.ai/code',
      },
      {
        name: 'Cursor',
        what: 'AI-first code editor for when I want structured IDE control. Good for navigating larger codebases, reviewing diffs, and working through changes file by file.',
        url: 'https://www.cursor.com',
      },
    ],
  },
  {
    id: 'knowledge',
    label: 'Knowledge & Notes',
    description: 'Where thinking gets stored and surfaced.',
    tools: [
      {
        name: 'Obsidian',
        what: 'Where documents, specs, research, and notes live. Connected to Claude via MCP — so context from my notes surfaces automatically when I\'m working on something related. The vault becomes an active part of the workflow.',
        url: 'https://obsidian.md',
      },
    ],
  },
  {
    id: 'design',
    label: 'Design & Iteration',
    description: 'How I review and iterate on product design without breaking the AI loop.',
    tools: [
      {
        name: 'Figma + MCP',
        what: 'Figma connected via MCP means I can pull designs directly into Claude. Read frames, review flows, generate copy, check specs — all in one session. No tab-switching, no exporting. The feedback loop between design and product thinking gets much tighter.',
        url: 'https://www.figma.com',
      },
    ],
  },
  {
    id: 'connections',
    label: 'MCP Connections',
    description: 'The full integration layer that ties everything together.',
    tools: [
      {
        name: 'Full MCP Stack',
        what: 'Slack, Jira, Google Drive, Figma, Snowflake — all connected to Claude in one session. Ask a question about a Jira ticket, pull context from a Slack thread, query billing data, review a doc. One environment. No context-switching.',
        url: 'https://modelcontextprotocol.io',
      },
    ],
  },
]

export default function Stack() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={{
        maxWidth: 'var(--max-w)',
        margin: '0 auto',
        padding: '64px var(--page-px) 120px',
      }}
    >
      {/* Header */}
      <header className="reveal" style={{ marginBottom: '56px' }}>
        <p
          style={{
            fontSize: '12px',
            color: 'var(--accent)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 500,
            marginBottom: '16px',
          }}
        >
          Stack
        </p>
        <h1
          style={{
            fontSize: 'clamp(28px, 4.5vw, 40px)',
            letterSpacing: '-0.02em',
            marginBottom: '16px',
          }}
        >
          How I work
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '560px' }}>
          A PM who builds with AI. These are the tools that make it possible — from voice input
          to agentic workflows to design review. The whole loop.
        </p>
      </header>

      {/* Sections */}
      <div className="reveal-stagger" style={{ display: 'flex', flexDirection: 'column', gap: '52px' }}>
        {sections.map((section) => (
          <section key={section.id} className="reveal">
            {/* Section header */}
            <div
              style={{
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <h2 style={{ fontSize: '20px', marginBottom: '6px' }}>{section.label}</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{section.description}</p>
            </div>

            {/* Tools */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {section.tools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card-interactive"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '160px 1fr',
                    gap: '16px',
                    padding: '18px 20px',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    background: 'var(--bg-elevated)',
                    alignItems: 'baseline',
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>{tool.name}</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {tool.what}
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
