import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceStorage, Collection, ImageType } from '../library';

db();

const EventsDelete: CloudFunction<DocumentSnapshot> =

firestore.
document(`${Collection.Events}/{id}`).
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const bucketPath: string = `${Collection.Events}/${snapshot.id}/${ImageType.Image}.jpeg`;

    return ServiceStorage.delete(bucketPath);
});

export { EventsDelete };
