import { TypeOf } from '@theory/core';

import { StateCollectionModel } from '../collection';

export interface StateChildModel<T> extends StateCollectionModel<T>
{
    id          : string;
    sortFields  : Record<string, TypeOf>;
    childLookup : Record<string, Partial<T>>;
}
