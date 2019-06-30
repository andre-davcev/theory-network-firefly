import { firestore } from 'firebase-admin';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { QuerySnapshot, Firestore, WriteResult } from '@google-cloud/firestore';

export class ServiceFirestore
{
    public static clone(object: Record<string, any>): Record<string, any>
    {
        return JSON.parse(JSON.stringify(object));
    }

    public static create(snapshot: DocumentSnapshot, object: Record<string, any> = {}): Record<string, any>
    {
        const id:        string               = snapshot.id;
        const timestamp: firestore.FieldValue = firestore.FieldValue.serverTimestamp();

        return {
            ...object,

            id,
            dateCreated: timestamp,
            dateUpdated: timestamp
        };
    }

    public static async foreignKeyAlter(snapshot: DocumentSnapshot, database: Firestore, collectionKey: string, propertyKey, add: boolean = true): Promise<WriteResult>
    {
        const id:     string = snapshot.id;
        const userId: string = snapshot.data().userId;

        const document: DocumentSnapshot  = await database.collection(collectionKey).doc(userId).get();
        const object: Record<string, any> = document.data();

        let subcollection: Record<string, string> | Array<string> = object[propertyKey];

        if (subcollection != null)
        {
            if (subcollection instanceof Array)
            {
                const array: Array<string> = subcollection as Array<string>;

                if (add)
                {
                    array.push(id);
                }
                else
                {
                    const index: number = array.findIndex((key: string) => key === propertyKey);

                    subcollection = array.splice(index, 1);
                }
            }
            else
            {
                if (add)
                {
                    subcollection[id] = id;
                }
                else
                {
                    delete subcollection[id];
                }
            }
        }

        return document.ref.update({ [propertyKey]: subcollection });
    }
}
