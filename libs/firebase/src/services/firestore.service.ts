import { Model } from '../interfaces';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { firestore } from 'firebase/app';
import { CoreEnum, CoreUtil } from '@theory/core';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class ServiceFirestore<T extends Model>
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

    public documentCreate(collection: string, object: T): Observable<firestore.DocumentSnapshot>
    {
        const id: string = object.id == null || object.id === CoreEnum.IdNew ? this.firestore.createId() : object.id;

        const timestamp: firebase.firestore.FieldValue = firestore.FieldValue.serverTimestamp();

        object =
        {
            ...object,

            dateCreated: timestamp,
            dateUpdated: timestamp,
            id
        };

        const document: AngularFirestoreDocument<T> = this.firestore.collection<T>(collection).doc(object.id);

        return from(document.set(object)).pipe
        (
            switchMap(() => from(document.get()))
        );
    }

    public documentUpdate(snapshot: firestore.DocumentSnapshot, partial: Partial<T>)
    {
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
