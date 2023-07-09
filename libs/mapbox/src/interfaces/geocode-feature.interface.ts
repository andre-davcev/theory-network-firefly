import { MapboxPlaceType } from '../enums';
import { Geometry } from './geometry.interface';
import { ContextItem } from './context-item.interface';

export interface GeocodeFeature {
  id: string;
  type: string;
  place_type: Array<MapboxPlaceType>;
  relevance: number;
  properties: Record<string, any>;
  text: string;
  place_name: string;
  bbox: [number, number, number, number];
  center: [number, number];
  geometry: Geometry;
  context: Array<ContextItem>;
}
