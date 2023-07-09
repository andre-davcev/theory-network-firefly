import { TypeOf } from '@theory/core';
import { OrderBy, DocumentSnapshot } from '@theory/firebase';

export interface StateCollectionModel<T> {
  pageSize: number;
  orderBy: string;
  orderByDirection: OrderBy;
  orderByType?: TypeOf;

  initialized: boolean;
  loading: boolean;
  finishedPaging: boolean;

  keys: Array<string>;
  keysFiltered?: Array<string>;
  snapshotLookup: Record<string, DocumentSnapshot>;
  dataLookup: Record<string, T>;

  data: Array<T>;
}
