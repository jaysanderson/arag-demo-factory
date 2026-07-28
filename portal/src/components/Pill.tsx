import { Button } from '@progress/kendo-react-buttons';

// An interactive pill. KendoReact `Chip`'s onClick does not reliably fire on a
// DOM click (same failure class as `Card`), so anything a user must CLICK is a
// Kendo `Button` styled as a pill instead — still a vendor control, but its
// click handler is rock-solid. Display-only badges stay as `Chip`.
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
    <Button
      type="button"
      onClick={onClick}
      title={title}
      className="pill"
      rounded="full"
      size="small"
      fillMode={selected ? 'solid' : 'outline'}
      themeColor={selected ? 'primary' : 'base'}
    >
      {text}
    </Button>
  );
}
