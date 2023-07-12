import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentSnapshot
} from '@angular/fire/compat/firestore';
import { FieldValue, serverTimestamp } from '@angular/fire/firestore';
import { CoreEnum } from '@theory/core';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { FirebaseDocument } from '../interfaces';
import { DocumentSnapshot as FirestoreDocumentSnapshot } from '../types';

export class ServiceFirestoreBase {
  public static collection<T>(
    firestore: AngularFirestore,
    collection: string
  ): AngularFirestoreCollection<T> {
    return firestore.collection(collection);
  }

  public static documentGet<T>(
    service: AngularFirestore,
    collection: string,
    id: string
  ): Observable<FirestoreDocumentSnapshot> {
    const document: AngularFirestoreDocument<T> = service
      .collection<T>(collection)
      .doc(id);

    return from(document.get());
  }

  public static documentWatch<T>(
    service: AngularFirestore,
    collection: string,
    id: string
  ): Observable<DocumentSnapshot<T>> {
    return service
      .collection<T>(collection)
      .doc<T>(id)
      .snapshotChanges()
      .pipe(map((actions: Action<DocumentSnapshot<T>>) => actions.payload));
  }

  public static documentSet<T extends FirebaseDocument>(
    service: AngularFirestore,
    collection: string,
    entity: T
  ): Observable<FirestoreDocumentSnapshot> {
    const document: AngularFirestoreDocument<T> = service
      .collection<T>(collection)
      .doc(entity.id);

    return from(document.set(entity)).pipe(
      switchMap(() => from(document.get()))
    );
  }

  public static documentPatch<T extends FirebaseDocument>(
    service: AngularFirestore,
    collection: string,
    entity: T
  ): Observable<FirestoreDocumentSnapshot> {
    const document: AngularFirestoreDocument<T> = service
      .collection<T>(collection)
      .doc(entity.id);

    return from(document.update(entity)).pipe(
      switchMap(() => from(document.get()))
    );
  }

  public static documentCreate<T extends FirebaseDocument>(
    service: AngularFirestore,
    collection: string,
    entity: T
  ): Observable<FirestoreDocumentSnapshot> {
    const { metadata, ...object } = entity;

    const id: string =
      object.id == null || object.id === CoreEnum.IdNew
        ? service.createId()
        : object.id;

    const timestamp: FieldValue = serverTimestamp();

    object.dateCreated = timestamp;
    object.dateUpdated = timestamp;
    object.id = id;

    return ServiceFirestoreBase.documentSet(service, collection, object);
  }

  public static documentUpdate<T extends FirebaseDocument>(
    snapshot: FirestoreDocumentSnapshot,
    object: Partial<T>
  ) {
    const { metadata, ...partial } = object;

    partial.dateUpdated = serverTimestamp();

    return from(snapshot.ref.update(partial));
  }

  public static documentDelete(
    snapshot: FirestoreDocumentSnapshot
  ): Observable<void> {
    return from(snapshot.ref.delete());
  }
}
