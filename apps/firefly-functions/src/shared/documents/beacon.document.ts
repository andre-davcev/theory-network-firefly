import { DocumentBase } from './base.document';

export interface Beacon extends DocumentBase {
  description: string;
  name: string;
  major: number;
  majorLabel: string;
  minor: number;
  minorLabel: string;
  tagline: string;
  uuid: string;
  uuidLabel: string;
}
