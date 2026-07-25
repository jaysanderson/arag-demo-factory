import { useState } from 'react';
import { Plug, Copy, Check, Terminal, Search, FileText, Layers } from 'lucide-react';
import type { SurfaceProps } from './types';
import { PageHeader } from '../components/PageHeader';

// MCP endpoint explorer. The KB is itself an MCP server other agents can call.
// We never print the zone/host (Hard Rule 4) — the endpoint is shown as an env
// placeholder the SE fills in from server-side config.
const TOOLS = [
  { icon: Search, name: 'search_documents', desc: 'Semantic search over the Knowledge Box; returns ranked passages with source ids.' },
  { icon: FileText, name: 'get_document', desc: 'Fetch a full resource by id, including its extracted text and metadata.' },
  { icon: Layers, name: 'batch_get_documents', desc: 'Resolve many resources at once — efficient context hydration for an agent.' },
];

const MCP_CONFIG = `{
  "mcpServers": {
    "knowledge-box": {
      "url": "\${NUCLIA_KB_URL}/mcp/sse",
      "headers": {
        "X-NUCLIA-SERVICEACCOUNT": "Bearer \${NUCLIA_SERVICEACCOUNT}"
      }
    }
  }
}`;

export function McpSurface({ surface }: SurfaceProps) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(MCP_CONFIG).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader icon={surface.icon} title="MCP Endpoint">
        Your content becomes a tool any AI agent can call. The Knowledge Box exposes an MCP server, so an assistant can
        search and read your corpus directly — the Agent-Experience story.
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-3">
        {TOOLS.map((t) => (
          <div key={t.name} className="card p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>
              <t.icon size={18} />
            </span>
            <p className="mt-2 font-mono text-sm font-semibold text-ink-900 dark:text-ink-100">{t.name}</p>
            <p className="mt-1 text-xs text-ink-500">{t.desc}</p>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-ink-200 px-4 py-2.5 dark:border-ink-800">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
            <Terminal size={14} /> MCP client configuration
          </span>
          <button onClick={copy} className="inline-flex items-center gap-1 text-xs text-ink-500 hover:text-ink-800">
            {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre className="scroll-slim overflow-x-auto p-4 font-mono text-xs leading-relaxed text-ink-700 dark:text-ink-300">
{MCP_CONFIG}
        </pre>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-dashed border-ink-300 p-4 text-sm text-ink-600 dark:border-ink-700 dark:text-ink-300">
        <Plug size={18} className="mt-0.5 shrink-0" style={{ color: 'var(--brand)' }} />
        <p>
          The endpoint and token resolve from server-side environment — <code className="font-mono">NUCLIA_KB_URL</code> and{' '}
          <code className="font-mono">NUCLIA_SERVICEACCOUNT</code>. The token is never rendered here or shipped to the browser;
          the host/zone is deliberately omitted from customer-facing surfaces.
        </p>
      </div>
    </div>
  );
}
