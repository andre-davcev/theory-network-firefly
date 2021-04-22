import { FirebaseDocument } from '../interfaces';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DocumentSnapshot as FirestoreDocumentSnapshot } from '@theory/firebase';
import { CoreEnum, CoreUtil } from '@theory/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ServiceFirestoreBase } from './firestore-base.service';

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
        return ServiceFirestoreBase.collection<T>(this.firestore, collection);
    }

    public documentGet(collection: string, id: string): Observable<FirestoreDocumentSnapshot>
    {
        return ServiceFirestoreBase.documentGet<T>(this.firestore, collection, id);
    }

    public documentWatch<T>(collection: string, id: string): Observable<DocumentSnapshot<T>>
    {
        return ServiceFirestoreBase.documentWatch<T>(this.firestore, collection, id);
    }

    public documentCreate(collection: string, entity: T): Observable<FirestoreDocumentSnapshot>
    {
        return ServiceFirestoreBase.documentCreate<T>(this.firestore, collection, entity);
    }

    public documentUpdate(snapshot: FirestoreDocumentSnapshot, object: Partial<T>)
    {
        return ServiceFirestoreBase.documentUpdate<T>(snapshot, object);
    }

    public documentDelete(snapshot: FirestoreDocumentSnapshot): Observable<void>
    {
        return ServiceFirestoreBase.documentDelete(snapshot);
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
        controlsConfig.metadata = controlsConfig.metadata == null ? {} : controlsConfig.metadata;

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

    public createId(): string
    {
        return this.firestore.createId();
    }
}
