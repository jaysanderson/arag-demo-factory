import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Dialog } from '@progress/kendo-react-dialogs';
import { Card, CardBody } from '@progress/kendo-react-layout';
import { getResource } from '../lib/arag';
import { Spinner, ErrorBanner } from './States';

// Document viewer, opened from a citation or a search result. Rendered as a
// KendoReact Dialog. Nuclia's `show=values` returns the field bodies; we render
// the text fields.
export function DocumentDrawer({ id, onClose }: { id: string | null; onClose: () => void }) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    setData(null);
    getResource(id)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (!id) return null;

  const bodies: string[] = [];
  if (data) {
    for (const field of Object.values<any>(data.data?.texts || {})) {
      if (field?.value?.body) bodies.push(field.value.body);
    }
    if (data.summary && !bodies.length) bodies.push(data.summary);
  }
  const sourceUrl = data?.origin?.url || null;

  return (
    <Dialog
      title={data?.title || 'Document'}
      onClose={onClose}
      width={640}
      height="80vh"
      className="arag-doc-dialog"
    >
      <div className="scroll-slim flex h-full flex-col gap-4 overflow-y-auto p-1">
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--brand)' }}>
          Document
        </p>
        {loading && <Spinner label="Loading document…" />}
        {error && <ErrorBanner>{error}</ErrorBanner>}
        {data && (
          <>
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm hover:underline"
                style={{ color: 'var(--brand)' }}
              >
                <ExternalLink size={14} /> Open original source
              </a>
            )}
            {bodies.map((b, i) => (
              <Card key={i}>
                <CardBody>
                  <article className="whitespace-pre-wrap text-sm leading-relaxed text-ink-700 dark:text-ink-300">
                    {b}
                  </article>
                </CardBody>
              </Card>
            ))}
            {!bodies.length && <p className="text-sm text-ink-500">No text body available for this resource.</p>}
          </>
        )}
      </div>
    </Dialog>
  );
}
