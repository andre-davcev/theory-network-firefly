import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceFirestore, Version } from '../library';

const database: Firestore = db();

const ImagesCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('images/{id}').
onCreate((snapshot: DocumentSnapshot, context: EventContext) =>
{
    const id:     string = snapshot.id;
    const userId: string = snapshot.data().userId;

    const object: Record<string, any> = ServiceFirestore.create(snapshot,
    {
        version: Version.Images
    });

    return Promise.all
    ([
        snapshot.ref.update(object),
        database.collection('image-events').doc(id).create({}),
        database.collection('user-images').doc(userId).update
        ({
            [id]:
            {
                sort:
                {
                    name:         object.name,
                    dateCreated : object.dateCreated
                }
            }
        })
    ]);
});

export { ImagesCreate };
