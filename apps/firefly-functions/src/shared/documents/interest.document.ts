import { Nullable } from '../../library';
import { MetadataList } from '../interfaces';
import { DocumentBase } from './base.document';

export interface MetadataInterest extends MetadataList {
  image?: string;
}

export interface Interest extends DocumentBase {
  description: string;
  name: string;
  private: boolean;
  subscriberCount: number;
  tagline: string;
  virtual: boolean;

  metadata: Nullable<MetadataInterest>;
}
