import { useScrollReveal } from '../hooks/useScrollReveal'

const sections = [
  {
    id: 'voice',
    label: 'Voice & Input',
    description: 'How I get words out fast without typing everything.',
    tools: [
      {
        name: 'Wispr Flow',
        role: 'Capture',
        what:
          'Voice dictation that works across Mac. I speak, it types — Slack messages, specs, emails, prompts. Faster than typing and closer to how I naturally think.',
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
        role: 'Primary',
        what:
          "My main environment. Agentic coding, Slack research, SQL, feature specs, DACI docs, weekly updates — most of what's on the Build page runs through it.",
        url: 'https://claude.ai/code',
      },
      {
        name: 'Cursor',
        role: 'Structured IDE',
        what:
          'The editor I reach for when I want tighter codebase navigation, file-by-file review, and more explicit control over changes.',
        url: 'https://www.cursor.com',
      },
    ],
  },
  {
    id: 'knowledge',
    label: 'Knowledge & Notes',
    description: 'Where thinking gets stored and surfaced again later.',
    tools: [
      {
        name: 'Obsidian',
        role: 'Memory',
        what:
          'Docs, specs, research, and notes live here. Connected via MCP, so the vault becomes an active part of the workflow instead of an archive I forget to revisit.',
        url: 'https://obsidian.md',
      },
    ],
  },
  {
    id: 'design',
    label: 'Design & Iteration',
    description: 'How product thinking and design review stay in the same loop.',
    tools: [
      {
        name: 'Figma + MCP',
        role: 'Review',
        what:
          'Designs can be pulled directly into Claude for flow review, copy work, and spec checking without switching contexts or exporting frames.',
        url: 'https://www.figma.com',
      },
    ],
  },
  {
    id: 'connections',
    label: 'Integration Layer',
    description: 'The connective tissue that keeps tools from becoming tabs.',
    tools: [
      {
        name: 'Full MCP Stack',
        role: 'Context',
        what:
          'Slack, Jira, Google Drive, Figma, and data tools inside one session. Ask the question once, keep the work in one place, move faster.',
        url: 'https://modelcontextprotocol.io',
      },
    ],
  },
]

const workflow = ['Capture', 'Think', 'Draft', 'Build', 'Review']

export default function Stack() {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div ref={ref} className="shell shell--wide page">
      <header className="page-intro reveal">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <p className="page-label">Stack</p>
          <h1 className="page-title page-title--compact">How I work</h1>
        </div>
        <p className="page-support" style={{ maxWidth: '44rem' }}>
          A PM who builds with AI needs more than a tool list. The useful part is the
          loop: how thoughts get captured, shaped, turned into output, and reviewed
          without losing momentum.
        </p>
      </header>

      <section className="section-stack" style={{ marginBottom: '64px' }}>
        <div className="section-heading reveal">
          <span className="section-kicker">The loop</span>
          <h2 className="section-title">A simple system that keeps work moving.</h2>
        </div>

        <div className="workflow-strip reveal-stagger">
          {workflow.map((step, index) => (
            <div key={step} className="workflow-step reveal">
              <span className="workflow-step__index">0{index + 1}</span>
              <p style={{ fontSize: '18px', color: 'var(--text)', fontWeight: 600 }}>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-stack">
        <div className="section-heading reveal">
          <span className="section-kicker">Tooling by job</span>
          <h2 className="section-title">Each tool exists to tighten one part of the loop.</h2>
          <p className="section-summary">
            I&apos;m not optimizing for the biggest stack. I&apos;m optimizing for fewer breaks
            in concentration, faster turns, and better judgment under real-world time pressure.
          </p>
        </div>

        <div className="reveal-stagger" style={{ display: 'flex', flexDirection: 'column', gap: '42px' }}>
          {sections.map((section) => (
            <section key={section.id} className="reveal" id={section.id}>
              <div className="section-heading" style={{ marginBottom: '18px' }}>
                <span className="section-kicker">{section.label}</span>
                <p className="section-summary">{section.description}</p>
              </div>

              <div className="utility-list">
                {section.tools.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noreferrer"
                    className="utility-card utility-row"
                  >
                    <div className="utility-row__title">
                      <span className="utility-row__name">{tool.name}</span>
                      <div className="tag-row">
                        <span className="tag">{tool.role}</span>
                      </div>
                    </div>
                    <p className="utility-row__body">{tool.what}</p>
                    <div className="utility-row__cta">
                      <span className="btn-tertiary">Open tool</span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  )
}
