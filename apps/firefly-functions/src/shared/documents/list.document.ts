import { Nullable } from '../../library';
import { MetadataArray } from '../interfaces';
import { DocumentBase } from './base.document';

export interface MetadataList extends MetadataArray {
  image?: string;
}

export interface List extends DocumentBase {
  description: string;
  name: string;
  private: boolean;
  subscriberCount: number;
  tagline: string;
  virtual: boolean;

  metadata: Nullable<MetadataList>;
}
