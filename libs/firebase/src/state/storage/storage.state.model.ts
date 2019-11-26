import { StorageImage } from '@theory/firebase/interfaces';

export interface StateStorageModel
{
    images: Record<string, StorageImage>;
}
