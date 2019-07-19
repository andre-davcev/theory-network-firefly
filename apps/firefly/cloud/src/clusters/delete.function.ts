import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, FieldValue, WriteResult, CollectionReference } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const ClustersDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('clusters/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const database: Firestore           = db();
    const id:       string              = snapshot.id;
    const data:     Record<string, any> = snapshot.data();
    const userId:   string              = data.userId;
    const iconId:   string              = data.iconId;

    return Promise.all
    ([
        database.collection('cluster-subscribers').doc(id).delete(),
        database.collection('cluster-events').doc(id).delete(),
        database.collection('icon-clusters').doc(iconId).update({ [id]: FieldValue.delete() }),
        database.collection('user-clusters').doc(userId).update({ [id]: FieldValue.delete() })
    ]);
});

export { ClustersDelete };
