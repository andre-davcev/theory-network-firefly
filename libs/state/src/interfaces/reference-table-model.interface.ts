import { TypeOf } from '@theory/core';

export interface StateReferenceTableModel<R, T>
{
    data:          Record<string, R>;
    lookup:        Record<string, T>;
    keys:          Array<string>;
    list:          Array<T>;
    offset:        number;
    pageSize:      number;
    initialized:   boolean;
    sortFields:    Record<string, TypeOf>;
    sort:          string;
    sortAscending: boolean;
}
