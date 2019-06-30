import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { FieldValue, DocumentSnapshot } from '@google-cloud/firestore';

const ClustersCreate: CloudFunction<DocumentSnapshot> =

firestore.
document('clusters/{id}').
onCreate((snapshot: DocumentSnapshot, context: EventContext) =>
{
    const timestamp: FieldValue = FieldValue.serverTimestamp();
    const data: Record<string, any> =
    {
        dateCreated: timestamp,
        dateUpdated: timestamp,
        v:           '1.0.0'
    };

    return snapshot.ref.update(data);
});

export { ClustersCreate };
