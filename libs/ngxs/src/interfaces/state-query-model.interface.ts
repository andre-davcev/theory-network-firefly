import { ServiceBase, ImageSize, OrderBy } from '@theory/firebase';
import { Query } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

export interface StateQueryModel<E, S extends ServiceBase<E>>
{
    service:          S;
    query:            Query;
    pageSize:         number;
    orderBy:          string;
    orderByDirection: OrderBy;

    initialized:    boolean;
    finishedPaging: boolean;
    imageSize:      ImageSize;

    snapshots:      Array<firestore.QueryDocumentSnapshot>;
    snapshotLookup: Record<string, firestore.QueryDocumentSnapshot>;
    list:           Array<E>;

}
