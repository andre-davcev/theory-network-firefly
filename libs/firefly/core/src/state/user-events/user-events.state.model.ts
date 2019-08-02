import { Event } from '@firefly/core/models';
import { SortField } from '@theory/core/interfaces/sort-field.interface';

export interface StateUserEventsModel
{
    data: Record<string, string | Event>;
    list: Array<Event>;
    sort: Array<SortField>;
}
