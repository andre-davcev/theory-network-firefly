import { Image } from '@firefly/core/documents';
import { StateDocumentModel } from '@theory/ngxs';

export interface StateImageModel extends StateDocumentModel
{
    dataUri: string;
}
