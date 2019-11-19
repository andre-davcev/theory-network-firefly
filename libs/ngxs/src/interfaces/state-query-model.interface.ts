import { ServiceBase, ImageSize } from '@theory/firebase';
import { Query } from '@angular/fire/firestore';
import { firestore } from 'firebase';

export interface StateQueryModel<E, S extends ServiceBase<E>>
{
    service:          S;
    query:            Query;
    limit:            number;
    orderBy:          string;
    orderByDirection: firestore.OrderByDirection;

    initialized:    boolean;
    finishedPaging: boolean;

    snapshots:      Array<firestore.QueryDocumentSnapshot>;
    snapshotLookup: Record<string, firestore.QueryDocumentSnapshot>;

    list: Array<E>;

    imageSize: ImageSize;
}
