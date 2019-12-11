import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, WriteResult } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceFirestore, Version, ServiceCities } from '../library';

const database: Firestore = db();

const EventsCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('events/{id}').
onCreate(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const object: Record<string, any> = ServiceFirestore.create(snapshot,
    {
        version: Version.Events
    });

    return Promise.all
    ([
        snapshot.ref.update(object),
        ServiceCities.createIfNew(database, object.city)
    ]);
});

export { EventsCreate };
