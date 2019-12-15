import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, FieldValue, WriteResult } from '@google-cloud/firestore';
import { firestore as db, storage } from 'firebase-admin';
import { ServiceStorage } from '../library';

const database: Firestore = db();

const IconsDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('icons/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const bucketPath: string = snapshot.data().bucketPath;

    const deletes: Array<Promise<any>> = ServiceStorage.
        bucketPaths(bucketPath, false).
        map((path: string) =>
            storage().bucket().file(path).delete()
        );

    return Promise.all(deletes);
});

export { IconsDelete };
