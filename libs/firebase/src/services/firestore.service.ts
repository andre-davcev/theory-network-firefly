import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentSnapshot
} from '@angular/fire/compat/firestore';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup
} from '@angular/forms';
import { Observable } from 'rxjs';

import { CoreEnum, CoreUtil } from '@theory/core';

import { FirebaseDocument } from '../interfaces';
import { DocumentSnapshot as FirestoreDocumentSnapshot } from '../types';
import { ServiceFirestoreBase } from './firestore-base.service';

@Injectable({ providedIn: 'root' })
export class ServiceFirestore<T extends FirebaseDocument> {
  constructor(
    public firestore: AngularFirestore,
    public formBuilder: UntypedFormBuilder
  ) {}

  public collection(collection: string): AngularFirestoreCollection<T> {
    return ServiceFirestoreBase.collection<T>(this.firestore, collection);
  }

  public documentGet(
    collection: string,
    id: string
  ): Observable<FirestoreDocumentSnapshot<T>> {
    return ServiceFirestoreBase.documentGet<T>(this.firestore, collection, id);
  }

  public documentWatch<T>(
    collection: string,
    id: string
  ): Observable<DocumentSnapshot<T>> {
    return ServiceFirestoreBase.documentWatch<T>(
      this.firestore,
      collection,
      id
    );
  }

  public documentCreate(
    collection: string,
    entity: T
  ): Observable<FirestoreDocumentSnapshot<T>> {
    return ServiceFirestoreBase.documentCreate<T>(
      this.firestore,
      collection,
      entity
    );
  }

  public documentUpdate(
    snapshot: FirestoreDocumentSnapshot<T>,
    object: Partial<T>
  ) {
    return ServiceFirestoreBase.documentUpdate<T>(snapshot, object);
  }

  public documentDelete(
    snapshot: FirestoreDocumentSnapshot<T>
  ): Observable<void> {
    return ServiceFirestoreBase.documentDelete(snapshot);
  }

  public formPatch(form: UntypedFormGroup, key: string, value: any): void {
    form.controls[key].patchValue(value);
  }

  public formFieldsChanged(form: UntypedFormGroup): Partial<T> {
    const data: Partial<T> = {};

    const controls: Record<string, AbstractControl> = form.controls;

    Object.keys(controls)
      .filter((key: string) => controls[key].dirty && controls[key].valid)
      .forEach((key: string) => ((data as any)[key] = controls[key].value));

    return data;
  }

  public formCreate(controlsConfig: Record<string, any>): UntypedFormGroup {
    controlsConfig['metadata'] =
      controlsConfig['metadata'] == null ? {} : controlsConfig['metadata'];

    return this.formBuilder.group(controlsConfig);
  }

  public formDataNew(userId: string, defaults: T): T {
    const object: T = {
      ...CoreUtil.clone<T>(defaults),
      id: CoreEnum.IdNew,
      userId
    };

    return object;
  }

  public createId(): string {
    return this.firestore.createId();
  }
}
