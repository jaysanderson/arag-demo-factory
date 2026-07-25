// Minimal, safe-enough markdown for streamed answers. `marked` renders the
// grounded answer text (bold, lists, tables from the model). We keep it inline
// and small; answers are the model's own text, not user-authored HTML.

import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: true });

export function renderMarkdown(text: string): string {
  try {
    return marked.parse(text || '', { async: false }) as string;
  } catch {
    return escapeHtml(text || '');
  }
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
