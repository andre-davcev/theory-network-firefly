import { Observable, from } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FirebaseDocument } from '@theory/firebase/interfaces';
import { map, take } from 'rxjs/operators';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { CoreEnum, CoreUtil } from '@theory/core';
import { FieldValue, serverTimestamp } from '../types';

export class ServiceBase<T extends FirebaseDocument | Record<string, any>>
{
    public name:        string;
    public collection:  AngularFirestoreCollection<T>;
    public firestore:   AngularFirestore;
    public formBuilder: FormBuilder;

    constructor(name: string, firestore: AngularFirestore, formBuilder: FormBuilder, private reference: boolean = false)
    {
        this.name        = name;
        this.firestore   = firestore;
        this.collection  = firestore.collection<T>(this.name);
        this.formBuilder = formBuilder;
    }

    public document(id: string): AngularFirestoreDocument<T>
    {
        return this.collection.doc(id);
    }

    public get(id: string): Observable<T>
    {
        return this.valuesChanges(id).pipe(take(1));
    }

    public set(object: T): Observable<void>
    {
        return from(this.document(object.id).set(object));
    }

    public patch(id: string, partial: Partial<T>): Observable<void>
    {
        if (!this.reference)
        {
            partial['dateUpdated'] = serverTimestamp();
        }

        return from(this.document(id).update(partial));
    }

    public create(object: T): Observable<T>
    {
        if (!this.reference)
        {
            const id:        string     = object.id == null || object.id === CoreEnum.IdNew ? this.firestore.createId() : object.id;
            const timestamp: FieldValue = serverTimestamp();

            object =
            {
                ...object,

                dateCreated: timestamp,
                dateUpdated: timestamp,
                id
            };
        }

        return this.set(object).pipe
        (
            map(() => object)
        );
    }

    public delete(object: T): Observable<void>
    {
        return from(this.document(object.id).delete());
    }

    public valuesChanges(id: string): Observable<T>
    {
        return this.document(id).valueChanges();
    }

    public snapshot(id: string): Observable<T>
    {
        return this.valuesChanges(id).pipe(take(1));
    }

    public patchValue(form: FormGroup, key: string, value: any): void
    {
        form.controls[key].patchValue(value);
    }

    public build(userId: string, defaults: T): T
    {
        const object: T =
        {
            ...CoreUtil.clone<T>(defaults),
            id: CoreEnum.IdNew,
            userId
        };

        return object;
    }

    public changedFields(form: FormGroup): Partial<T>
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
}
