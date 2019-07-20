import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceFirestore, Version } from '../library';

const database: Firestore = db();

const EventsCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('events/{id}').
onCreate(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const id:     string = snapshot.id;
    const userId: string = snapshot.data().userId;

    const object: Record<string, any> = ServiceFirestore.create(snapshot,
    {
        version: Version.Events
    });

    return Promise.all
    ([
        snapshot.ref.update(object),
        database.collection('event-clusters').doc(id).create({}),
        database.collection('user-events').doc(userId).update({ [id]: id })
    ]);
});

export { EventsCreate };
