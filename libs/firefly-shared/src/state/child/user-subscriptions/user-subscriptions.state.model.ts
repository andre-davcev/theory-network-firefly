import { Subscription } from '@firefly/cloud';
import { StateChildModel } from '@theory/ngxs';
import { InterestsFilter } from '../../composite';

export interface StateUserSubscriptionsModel extends StateChildModel<Subscription>
{
    filter: InterestsFilter;
}
