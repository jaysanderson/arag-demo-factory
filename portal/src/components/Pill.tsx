// An interactive pill — a plain <button> (Kendo-free) so it works identically in
// both UI modes and its click handler is rock-solid (KendoReact `Chip`'s onClick
// does not reliably fire — the same failure class as `Card`). The `.pill` class
// (index.css) makes the label WRAP and never exceed its container, so a long
// probe/suggestion/filter value can't force horizontal overflow on a phone.
export function Pill({
  text,
  onClick,
  selected = false,
  title,
}: {
  text: string;
  onClick: () => void;
  selected?: boolean;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-pressed={selected}
      className="pill"
      data-selected={selected ? '' : undefined}
    >
      {text}
    </button>
  );
}
