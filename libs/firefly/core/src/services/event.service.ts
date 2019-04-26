
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { switchMap, take, filter, map } from 'rxjs/operators';

import { Event, AssetKey, Image, EventKey } from '@firefly/core/models';
import { ServiceImage } from './image.service';
import { ModelKey } from '@theory/firebase/enums';

@Injectable({ providedIn: 'root' })
export class ServiceEvent
{
    private _name: string = 'event';
    private _collection: AngularFirestoreCollection<Event>;

    constructor
    (
        private firestore: AngularFirestore,
        private image: ServiceImage
    )
    {
        this.collection = firestore.collection<Event>(this.name);
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

        const document: AngularFirestoreDocument<Event> = this.collection.doc(id);

        return from(document.set(event)).pipe
        (
            switchMap(() => document.valueChanges()),

            filter((e: Event) => e.dateCreated != null),

            take(1)
        );
    }

    public create(event: Event, imagePath: string): Observable<void>
    {
        const image: Image = this.imageFromEvent(event);

        return this.image.upload(imagePath, image.id).pipe
        (
            switchMap(() => this.image.set(image)),
            map(() => this.firestore.createId()),
            switchMap((id: string) => from(this.collection.doc(id).set({ ...event, [ModelKey.Id]: id, [EventKey.ImageId]: image.id })))
        );
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

    private bucketPath(event: Event): string
    {
        return `${event.userId}/image/${new Date().getTime()}.jpg`;
    }

    private imageFromEvent(event: Event): Image
    {
        const id: string = this.bucketPath(event);
        const image: Image =
        {
            [ModelKey.Id]          : id,
            [AssetKey.Name]        : '',
            [AssetKey.Description] : '',
            [AssetKey.Private]     : true,
            [AssetKey.UserId]      : event.userId,
            [AssetKey.Draft]       : false
        };

        return image;
    }

    public get name(): string
    {
        return this._name;
    }

    public get collection(): AngularFirestoreCollection<Event>
    {
        return this._collection;
    }

    public set collection(collection: AngularFirestoreCollection<Event>)
    {
        this._collection = collection;
    }
}
