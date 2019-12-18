import { Image } from '@firefly/cloud';
import { StateDocumentModel } from '@theory/ngxs';

export interface StateImageModel extends StateDocumentModel
{
    dataUri: string;
}
