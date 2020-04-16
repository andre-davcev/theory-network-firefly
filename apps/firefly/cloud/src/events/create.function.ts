import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceFirestore, Version, ServiceCities, Event, Collection } from '../library';

const database: Firestore = db();

const EventsCreate: CloudFunction<DocumentSnapshot> =

firestore.
document(`${Collection.Events}/{id}`).
onCreate(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const object: Event = ServiceFirestore.create<Event>(snapshot, Version.Events);

    return Promise.all
    ([
        snapshot.ref.update(object),
        ServiceCities.createIfNew(database, object)
    ]);
});

export { EventsCreate };
