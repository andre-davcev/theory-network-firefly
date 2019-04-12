
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { switchMap, take, filter, map } from 'rxjs/operators';

import { Event } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceEvent
{
    private eventsCollection: AngularFirestoreCollection<Event>;

    constructor (private firestore: AngularFirestore){
        this.eventsCollection = firestore.collection<Event>('events');
    }

    getEvents(userid: string): Observable<Array<Event>>
    {
        return this.firestore.
        collection<Event>('events', ref => ref.where('userId', '==', userid)).
        snapshotChanges().
        pipe
        (
            map((actions: Array<DocumentChangeAction<Event>>) =>
              actions.map((action: DocumentChangeAction<Event>) => {
                  return {
                      ...action.payload.doc.data(),
                      id: action.payload.doc.id
                  };
              }
            ))
        );
    }

    updateEvent()
    {

    }

    setEvent(event: Event): Observable<Event>
    {
        const id: string = this.firestore.createId();

        event = { ...event, id };

        const document: AngularFirestoreDocument<Event> = this.eventsCollection.doc(id);

        return from(document.set(event)).pipe
        (
            switchMap(() => document.valueChanges()),

            filter((e: Event) => e.dateCreated != null),

            take(1)
        );
    }

    public create(event: Event): Observable<any>
    {
        return of();
    }

    public read(id: string): Observable<any>
    {
        return of();
    }

    public update(event: Event): Observable<any>
    {
        return of();
    }

    public delete(id: string): Observable<any>
    {
        return of();
    }
}
