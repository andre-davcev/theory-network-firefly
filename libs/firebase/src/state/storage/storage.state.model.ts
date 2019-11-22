import { StorageImage } from '@theory/firebase/interfaces';

export interface StateStorageModel
{
    image:  StorageImage;
    images: Record<string, StorageImage>;
}
