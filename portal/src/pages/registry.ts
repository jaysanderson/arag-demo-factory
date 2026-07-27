import type { ComponentType } from 'react';
import type { SurfaceProps } from './types';
import { AskSurface } from './AskSurface';
import { SearchSurface } from './SearchSurface';
import { GraphSurface } from './GraphSurface';
import { DocStudioSurface } from './DocStudioSurface';
import { CallQaSurface } from './CallQaSurface';
import { WorkflowsSurface } from './WorkflowsSurface';
import { RemiSurface } from './RemiSurface';
import { McpSurface } from './McpSurface';
import { PersonalizeSurface } from './PersonalizeSurface';
import { VisibilitySurface } from './VisibilitySurface';
import { VoiceSurface } from './VoiceSurface';
import { AssetsSurface } from './AssetsSurface';
import { RelatedSurface } from './RelatedSurface';
import { AugmentSurface } from './AugmentSurface';

// Maps the `component` field in demo.config.json (resolved from each capability's
// portal block) to the React component that renders it. Adding a surface is a
// config change; the only code touch is registering a new component here.
export const SURFACES: Record<string, ComponentType<SurfaceProps>> = {
  AskSurface,
  SearchSurface,
  GraphSurface,
  DocStudioSurface,
  CallQaSurface,
  WorkflowsSurface,
  RemiSurface,
  McpSurface,
  PersonalizeSurface,
  VisibilitySurface,
  VoiceSurface,
  AssetsSurface,
  RelatedSurface,
  AugmentSurface,
};
