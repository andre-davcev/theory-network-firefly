export interface Geometry {
  type: string;
  coordinates: [number, number];
  interpolated?: boolean;
  omitted?: boolean;
}
