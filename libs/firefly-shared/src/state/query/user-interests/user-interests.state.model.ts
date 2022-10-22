import { Interest } from '@firefly/cloud';
import { StateQueryModel } from '@theory/ngxs';
import { InterestsFilter } from '../../composite/interests/interests.filter.model';

export interface StateUserInterestsModel extends StateQueryModel<Interest>
{
    filter: InterestsFilter;
}
