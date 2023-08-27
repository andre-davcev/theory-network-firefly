import {
  DocumentReference,
  DocumentSnapshot,
  FieldValue,
  Firestore,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  WriteResult
} from '@google-cloud/firestore';

import { Collection, DocumentBase } from '../../shared';
import { Version } from '../enums';

export class ServiceFirestore {
  public static clone(object: Record<string, any>): Record<string, any> {
    return JSON.parse(JSON.stringify(object));
  }

  public static create<T extends DocumentBase>(
    snapshot: DocumentSnapshot,
    version: Version
  ): T {
    const id: string = snapshot.id;
    const object: T = snapshot.data() as T;
    const timestamp: FieldValue = FieldValue.serverTimestamp();

    object.id = id;
    object.dateCreated = timestamp;
    object.dateUpdated = timestamp;
    object.version = version;

    return object;
  }

  public static async debugWrite(
    debug: boolean,
    database: Firestore,
    document: string,
    object: Record<string, any>,
    timestamp?: string
  ): Promise<WriteResult | void> {
    if (!debug) {
      return Promise.resolve();
    }

    timestamp = timestamp || new Date().toISOString().split('.')[0];
    const debugDoc: DocumentReference = database
      .collection(Collection.Debug)
      .doc(document);

    return debugDoc.set({
      [timestamp]: object
    });
  }

  public static async toArrayQuery<T>(query: Query): Promise<Array<T>> {
    const docs: QuerySnapshot = await query.get();

    return docs.docs.map(
      (snapshot: QueryDocumentSnapshot) => snapshot.data() as T
    );
  }

  public static async toArrayQuerySnapshots<T>(
    queries: Array<Promise<QuerySnapshot>>
  ): Promise<Array<T>> {
    const snapshots: Array<QuerySnapshot> = await Promise.all(queries);
    const data: Array<T> = [];

    snapshots.forEach((query: QuerySnapshot) =>
      query.forEach((snapshot: QueryDocumentSnapshot) =>
        data.push(snapshot.data() as T)
      )
    );

    return data;
  }
}
