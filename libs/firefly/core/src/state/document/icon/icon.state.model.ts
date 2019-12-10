import { Icon } from '@firefly/core/documents';
import { StateDocumentModel } from '@theory/ngxs';

export interface StateIconModel extends StateDocumentModel
{
    dataUri: string;
}
