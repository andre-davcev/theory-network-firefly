import { Timestamp } from 'firebase-admin/firestore';
import { GeoPoint } from 'firebase/firestore';

import { Nullable } from '../../library';
import { MapboxPlaceType } from '../enums';
import { CityInfo, MetadataArray, Place } from '../interfaces';
import { DocumentBase } from './base.document';

export interface MetadataEvent extends MetadataArray {
  score?: number;
  icon?: string;
  image?: string;
  place?: Place;
  isEvent?: boolean;
}

export interface Event extends DocumentBase {
  city: CityInfo;
  cityId: string;
  description: string;
  draft: boolean;
  geopoint: GeoPoint;
  lists: Array<string>;
  listsPending: Array<string>;
  name: string;
  notifyComplete: boolean;
  placeType: MapboxPlaceType;
  private: boolean;
  tagline: string;
  timeNotify: Timestamp;
  timeStart: Timestamp;
  timeEnd: Timestamp;
  phone?: string;
  virtual: boolean;
  website?: string;

  metadata: Nullable<MetadataEvent>;
}
