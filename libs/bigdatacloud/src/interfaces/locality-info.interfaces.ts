import { LocalityProperty } from './locality-property.interface';

export interface LocalityInfo {
  /*
      Administrative boundarires ordered by area (largest first). Omitted
      if no administrative boundaries are available
    */
  administrative: Array<LocalityProperty>;

  /*
      Non-administrative boundarires ordered by area (largest first). Omitted
      if not available
    */
  informative: Array<LocalityProperty>;
}
