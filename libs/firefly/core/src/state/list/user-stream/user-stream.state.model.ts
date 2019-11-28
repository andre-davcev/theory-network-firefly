import { StateReferenceTableModel } from '@theory/ngxs';
import { StreamItem, UserStreamItem } from '@firefly/core/models';

export interface StateUserStreamModel extends StateReferenceTableModel<UserStreamItem, StreamItem>
{

}
