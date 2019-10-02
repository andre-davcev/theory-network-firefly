import { SortField } from './sort-field.interface';

export interface StateReferenceTableModel<R, T>
{
    data:        Record<string, R>;
    lookup:      Record<string, T>;
    keys:        Array<string>;
    list:        Array<T>;
    offset:      number;
    pageSize:    number;
    sortField:   SortField;
    initialized: boolean;
}
