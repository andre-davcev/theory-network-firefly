import { GeoPoint, Timestamp } from 'firebase/firestore';

import { Nullable } from '../../library';
import { MapboxPlaceType } from '../enums';
import { CityInfo, MetadataList, Place } from '../interfaces';
import { DocumentBase } from './base.document';

export interface MetadataEvent extends MetadataList {
  score?: number;
  icon?: string;
  image?: string;
  place?: Place;
  isEvent?: boolean;
}

export interface Event extends DocumentBase {
  city: CityInfo;
  description: string;
  draft: boolean;
  geopoint: GeoPoint;
  interests: Array<string>;
  interestsPending: Array<string>;
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
