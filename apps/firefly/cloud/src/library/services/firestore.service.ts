import { firestore } from 'firebase-admin';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { Status } from '../enums';
import { ForeignKeyChange } from '../interfaces';

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

    public static mapStatus(before: Record<string, any> = {}, after: Record<string, any> = {}): Status
    {
        const totalBefore: number = Object.keys(before).length;
        const totalAfter:  number = Object.keys(after).length;

        let status: Status;

        if (totalAfter > totalBefore)
        {
            status = Status.Added;
        }
        else if (totalAfter < totalBefore)
        {
            status = Status.Removed;
        }
        else
        {
            status = Status.Changed;
        }

        return status;
    }

    public static mapChange(before: Record<string, any>, after: Record<string, any>): ForeignKeyChange
    {
        const changed: string = Object.keys(after).find((key: string) =>
            after[key] !== before[key]
        );

        const change: ForeignKeyChange =
        {
            key:    changed,
            before: before[changed],
            after:  after[changed]
        };

        return change;
    }
}
