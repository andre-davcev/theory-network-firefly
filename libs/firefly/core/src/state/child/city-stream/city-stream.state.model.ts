import { StateChildModel } from '@theory/ngxs';
import { StreamInterest } from '@firefly/cloud';
import { InterestsFilter } from '../../composite';

export interface StateCityStreamModel extends StateChildModel<StreamInterest>
{
    filter    : InterestsFilter;
    filterSet : boolean;

    subscriptionsNew: Record<string, string>;
}
