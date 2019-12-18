import { Icon } from '@firefly/cloud';
import { StateDocumentModel } from '@theory/ngxs';

export interface StateIconModel extends StateDocumentModel
{
    dataUri: string;
}
