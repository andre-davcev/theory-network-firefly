import { DocumentSnapshot, FieldValue } from '@google-cloud/firestore';

import { DocumentBase } from '../../shared';
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
    object.metadata = {};

    return object;
  }
}
