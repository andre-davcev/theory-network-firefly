import { StorageImage } from '../../interfaces';

export interface StateStorageModel {
  images: Record<string, StorageImage>;

  uploadProgress: number;
  uploadError: string;
}
