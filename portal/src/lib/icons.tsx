// Maps the `icon` names used in catalog capabilities (and demo.config surfaces)
// to lucide-react icons, so nav and surface headers get a consistent glyph
// purely from config.

import {
  MessagesSquare,
  Search,
  Filter,
  Share2,
  FileText,
  Phone,
  ListChecks,
  Sparkles,
  Eye,
  Gauge,
  Plug,
  Users,
  Mic,
  Image,
  Shuffle,
  Wand2,
  Circle,
  type LucideIcon,
} from 'lucide-react';

const MAP: Record<string, LucideIcon> = {
  chat: MessagesSquare,
  search: Search,
  filter: Filter,
  share: Share2,
  file: FileText,
  phone: Phone,
  steps: ListChecks,
  sparkle: Sparkles,
  eye: Eye,
  gauge: Gauge,
  plug: Plug,
  users: Users,
  mic: Mic,
  image: Image,
  shuffle: Shuffle,
  wand: Wand2,
};

export function surfaceIcon(name?: string | null): LucideIcon {
  return (name && MAP[name]) || Circle;
}
