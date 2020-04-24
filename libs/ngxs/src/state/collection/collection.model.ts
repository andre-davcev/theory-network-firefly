import { OrderBy } from '@theory/firebase';
import { firestore } from 'firebase/app';

export interface StateCollectionModel<T>
{
    pageSize:         number;
    orderBy:          string;
    orderByDirection: OrderBy;

    initialized:    boolean;
    loading:        boolean;
    finishedPaging: boolean;

    snapshots:      Array<firestore.DocumentSnapshot>;
    snapshotLookup: Record<string, firestore.DocumentSnapshot>;
    data:           Array<T>;
    dataLookup:     Record<string, T>;
}
