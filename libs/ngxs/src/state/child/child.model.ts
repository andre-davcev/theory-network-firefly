import { StateCollectionModel } from '../collection';
import { TypeOf } from '@theory/core';

export interface StateChildModel<T> extends StateCollectionModel<T>
{
    id:         string;
    sortFields: Record<string, TypeOf>;

    childLookup: Record<string, Partial<T>>;
    keysSorted:  Array<string>;
    offset:      number;
}
