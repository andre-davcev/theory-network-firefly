import { SortField } from './sort-field.interface';

export interface StateReferenceTableModel<T, M>
{
    data:       Record<string, M>;
    lookup:     Record<string, T>;
    list:       Array<T>;
    offset:     number;
    pageSize:   number;
    sortFields: Array<SortField>;
}
