import { Image } from '@firefly/core/models';
import { StateDocumentModel } from '@theory/ngxs';

export interface StateImageModel extends StateDocumentModel<Image>
{
    dataUri: string;
}
