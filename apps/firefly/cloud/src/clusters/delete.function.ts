import { firestore, EventContext, CloudFunction } from 'firebase-functions';
import { DocumentSnapshot, Firestore, FieldValue } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';

const database: Firestore = db();

const ClustersDelete: CloudFunction<DocumentSnapshot> =

firestore.
document('clusters/{id}').
onDelete(async(snapshot: DocumentSnapshot, context: EventContext) =>
{
    const id:       string              = snapshot.id;
    const data:     Record<string, any> = snapshot.data();
    const userId:   string              = data.userId;
    const iconId:   string              = data.iconId;

    return Promise.all
    ([
        database.collection('cluster-subscribers').doc(id).delete(),
        database.collection('user-clusters').doc(userId).update({ [id]: FieldValue.delete() })
    ]);
});

export { ClustersDelete };
