import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db, storage } from 'firebase-admin';
import { ServiceStorage, Collection, ImageType } from '../library';

const database: Firestore = db();

const EventsDelete: CloudFunction<DocumentSnapshot> =

firestore.
document(`${Collection.Events}/{id}`).
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const bucketPath: string = `${Collection.Events}/${snapshot.id}/${ImageType.Image}.jpeg`;

    return ServiceStorage.delete(bucketPath);
});

export { EventsDelete };
