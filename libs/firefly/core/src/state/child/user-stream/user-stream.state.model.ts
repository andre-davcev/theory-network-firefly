import { StateChildModel } from '@theory/ngxs';
import { StreamCluster } from '@firefly/cloud';

export interface StateUserStreamModel extends StateChildModel<StreamCluster>
{
    subscribed: Record<string, string>;
}
