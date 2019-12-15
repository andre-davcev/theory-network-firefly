import { Change, firestore, EventContext, CloudFunction } from 'firebase-functions';
import { FieldValue, DocumentSnapshot, CollectionReference, Firestore, WriteResult } from '@google-cloud/firestore';
import { firestore as db } from 'firebase-admin';
import { ServiceCities, ServiceFirestore } from '../library';

const database: Firestore = db();

const EventsUpdate : CloudFunction<Change<DocumentSnapshot>> =

firestore.
document('events/{id}').
onUpdate(async(change: Change<firestore.DocumentSnapshot>, context: EventContext) =>
{
    const before: any = change.before.data();
    const after:  any = change.after.data();

    const promises: Array<Promise<WriteResult>> = [];

    if (before.city.cityId !== after.city.cityId)
    {
        await ServiceCities.createIfNew(database, after.city);

        const cities: Array<DocumentSnapshot> = await Promise.all
        ([
            database.collection('cities').doc(before.city.cityId).get(),
            database.collection('cities').doc(after.city.cityId).get()
        ]);

        const cityBefore: DocumentSnapshot = cities[0];
        const cityAfter:  DocumentSnapshot = cities[1];

        const clusterEventsBefore: Record<string, number> = cityBefore.data().clusterEvents;
        const clusterEventsAfter:  Record<string, number> = cityAfter.data().clusterEvents;

        let eventsBefore;
        let eventsAfter;

        before.clusterList.
        forEach((clusterId: string) =>
        {
            eventsBefore = clusterEventsBefore[clusterId];

            if (eventsBefore === 1)
            {
                delete clusterEventsBefore[clusterId];
            }
            else
            {
                clusterEventsBefore[clusterId] -= 1;
            }

            eventsAfter                   = clusterEventsBefore[clusterId];
            clusterEventsAfter[clusterId] = eventsAfter == null ? 1 : eventsAfter + 1;
        });

        promises.push(cityBefore.ref.update({ clusterEvents: clusterEventsBefore }));
        promises.push(cityBefore.ref.update({ clusterEvents: clusterEventsAfter }));
    }
    else
    {
        const clusterRemoved : boolean = before.clusters.length < after.clusters.length;
        const clusterAdded   : boolean = before.clusters.length > after.clusters.length;

        if (clusterAdded || clusterRemoved)
        {
            const clusterId     : string                 = ServiceFirestore.arrayDiff(before.clusters, after.clusters)[0];
            const city          : DocumentSnapshot       = await database.collection('cities').doc(after.city.cityId).get();
            const clusterEvents : Record<string, number> = city.data().clusterEvents;
            const eventCount    : number                 = clusterEvents[clusterId];

            if (clusterRemoved)
            {
                if (eventCount === 1)
                {
                    delete clusterEvents[clusterId];
                }
                else
                {
                    clusterEvents[clusterId] = eventCount - 1
                }
            }
            else
            {
                clusterEvents[clusterId] = eventCount == null ? 1 : eventCount + 1
            }

            promises.push
            (
                city.ref.update
                ({
                    clusterEvents,
                    clusterList: clusterAdded ? FieldValue.arrayUnion(clusterId) : FieldValue.arrayRemove(clusterId)
                })
            );
        }
    }

    return promises;
});

export { EventsUpdate };
