import { TypeOf } from '@theory/core';
import { OrderBy } from '@theory/firebase';
import { firestore } from 'firebase/app';

export interface StateCollectionModel<T>
{
    pageSize         : number;
    orderBy          : string;
    orderByDirection : OrderBy;
    orderByType?     : TypeOf;

    initialized:    boolean;
    loading:        boolean;
    finishedPaging: boolean;

    snapshots:      Array<firestore.DocumentSnapshot>;
    snapshotLookup: Record<string, firestore.DocumentSnapshot>;
    data:           Array<T>;
    dataLookup:     Record<string, T>;
}
