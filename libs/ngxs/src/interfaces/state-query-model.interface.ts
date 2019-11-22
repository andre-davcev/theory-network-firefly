import { ImageSize, OrderBy } from '@theory/firebase';
import { firestore } from 'firebase/app';

export interface StateQueryModel<E>
{
    pageSize:         number;
    orderBy:          string;
    orderByDirection: OrderBy;

    initialized:    boolean;
    loading:        boolean;
    finishedPaging: boolean;
    imageSize:      ImageSize;

    snapshots:      Array<firestore.DocumentSnapshot>;
    snapshotLookup: Record<string, firestore.DocumentSnapshot>;
    data:           Array<E>;
    dataLookup:     Record<string, E>;
}
