import { ImageSize } from '../enums';

export interface StorageImage {
  [ImageSize.Small]?: string;
  [ImageSize.Medium]?: string;
  [ImageSize.Large]?: string;
  [ImageSize.None]?: string;
  [ImageSize.Original]?: string;
}
