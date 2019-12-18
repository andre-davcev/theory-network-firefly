import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceFirestore, Version, Icon } from '../library';

const database: Firestore = db();

const IconsCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('icons/{id}').
onCreate((snapshot: DocumentSnapshot, context: EventContext) =>
{
    const object: Icon = ServiceFirestore.create<Icon>(snapshot, { version: Version.Icons});

    return snapshot.ref.update(object);
});

export { IconsCreate };
