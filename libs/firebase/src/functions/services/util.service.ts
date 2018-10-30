import { firestore } from 'firebase-admin';
import { Change, EventContext } from 'firebase-functions';

export class Util
{
    public static timestamp(): firestore.FieldValue
    {
        return firestore.FieldValue.serverTimestamp();
    }

    public static createIndex(title: string): Record<string, boolean>
    {
        const parts: Array<string> = title.toLowerCase().split('');
        const searchableIndex: Record<string, boolean> = {};

        let prevKey: string = '';

        for (const char of parts)
        {
            const key = prevKey + char;
            searchableIndex[key] = true
            prevKey = key
        }

        return searchableIndex;
    }

    public static postCreate(snapshot: firestore.DocumentSnapshot, context: EventContext, version: string, patch?: Record<string, any>): Promise<FirebaseFirestore.WriteResult>
    {
        const timestamp: firestore.FieldValue = Util.timestamp();
        const metadata: Record<string, any> =
        {
            id: snapshot.id,
            dateCreated: timestamp,
            dateUpdated: timestamp,
            v: version
        };
        const data: Record<string, any> = patch == null ? {...metadata} : {...patch, ...metadata};

        return snapshot.ref.update(data);
    }

    public static postUpdate(change: Change<firestore.DocumentSnapshot>, context: EventContext, patch?: Record<string, any>): Promise<FirebaseFirestore.WriteResult>
    {
        if (change.after.data().dateUpdated !== change.before.data().dateUpdated) return null;

        const metadata: Record<string, any> =
        {
            dateUpdated: Util.timestamp()
        };
        const data: Record<string, any> = patch == null ? {...metadata} : {...patch, ...metadata};

        return change.after.ref.set(data);
    }
}

