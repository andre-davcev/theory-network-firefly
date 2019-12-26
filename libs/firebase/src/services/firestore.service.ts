import { FirebaseDocument } from '../interfaces';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, Action, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { firestore } from 'firebase/app';
import { CoreEnum } from '@theory/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class ServiceFirestore<T extends FirebaseDocument>
{
    constructor
    (
        public firestore:   AngularFirestore,
        public formBuilder: FormBuilder
    ) { }

    public collection(collection: string): AngularFirestoreCollection<T>
    {
        return this.firestore.collection(collection);
    }

    public documentGet(collection: string, id: string): Observable<firestore.DocumentSnapshot>
    {
        const document: AngularFirestoreDocument<T> = this.firestore.collection<T>(collection).doc(id);

        return from(document.get());
    }

    public documentWatch(collection: string, id: string): Observable<Action<DocumentSnapshot<T>>>
    {
        return this.firestore.collection<T>(collection).doc<T>(id).snapshotChanges();
    }

    public documentCreate(collection: string, entity: T): Observable<firestore.DocumentSnapshot>
    {
        let { metadata, ...object } = entity;

        const id: string = object.id == null || object.id === CoreEnum.IdNew ? this.firestore.createId() : object.id;

        const timestamp: firebase.firestore.FieldValue = firestore.FieldValue.serverTimestamp();

        object.dateCreated = timestamp;
        object.dateUpdated = timestamp;
        object.id          = id;

        const document: AngularFirestoreDocument<T> = this.firestore.collection<T>(collection).doc(object.id);

        return from(document.set(object as T)).pipe
        (
            switchMap(() => from(document.get()))
        );
    }

    public documentUpdate(snapshot: firestore.DocumentSnapshot, object: Partial<T>)
    {
        const { metadata, ...partial } = object;

        partial.dateUpdated = firestore.FieldValue.serverTimestamp();

        return from(snapshot.ref.update(partial));
    }

    public documentDelete(snapshot: firestore.DocumentSnapshot): Observable<void>
    {
        return from(snapshot.ref.delete());
    }

    public formPatch(form: FormGroup, key: string, value: any): void
    {
        form.controls[key].patchValue(value);
    }

    public formFieldsChanged(form: FormGroup): Partial<T>
    {
        const data: Partial<T> = {};

        const controls: Record<string, AbstractControl> = form.controls;

        Object.
            keys(controls).
            filter((key: string) =>
                controls[key].dirty && controls[key].valid
            ).
            forEach((key: string) =>
                data[key] = controls[key].value
            );

        return data;
    }

    public formCreate(controlsConfig: Record<string, any>): FormGroup
    {
        return this.formBuilder.group(controlsConfig);
    }

    public formDataNew(userId: string, defaults: T): T
    {
        const object: T =
        {
            ...CoreUtil.clone<T>(defaults),
            id: CoreEnum.IdNew,
            userId
        };

        return object;
    }
}
