import { Icon } from '@firefly/core/models';
import { StateDocumentModel } from '@theory/ngxs';

export interface StateIconModel extends StateDocumentModel
{
    dataUri: string;
}
