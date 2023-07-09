import { MapboxPlaceType, ReverseMode } from '../enums';

export interface ParamsReverseGeocode {
  /*
      Limit results to one or more countries. Permitted values are ISO 3166 alpha
      2 country codes separated by commas.
    */
  country?: string;

  /*
      Specify the user’s language. This parameter controls the language of the
      text supplied in responses.

      Options are IETF language tags comprised of a mandatory ISO 639-1 language
      code and, optionally, one or more IETF subtags for country or script.

      More than one value can also be specified, separated by commas, for
      applications that need to display labels in multiple languages.

      For more information on which specific languages are supported, see the
      language coverage section.
    */
  language?: string;

  /*
      Specify the maximum number of results to return. The default is 1 and the
      maximum supported is 5.

      The default behavior in reverse geocoding is to return at most one feature
      at each of the multiple levels of the administrative hierarchy (for example,
      one address, one region, one country). Increasing the limit allows returning
      multiple features of the same type, but only for one type (for example,
      multiple address results). Consequently, setting limit to a higher-than-default
      value requires specifying exactly one types parameter.
    */
  limit?: number;

  /*
      Decides how results are sorted in a reverse geocoding query if multiple results
      are requested using a limit other than 1. Options are distance (default), which
      causes the closest feature to always be returned first, and score, which allows
      high-prominence features to be sorted higher than nearer, lower-prominence features.
    */
  reverseMode?: ReverseMode;

  /*
      Specify whether to request additional metadata about the recommended navigation
      destination corresponding to the feature (true) or not (false, default). Only
      applicable for address features.

      For example, if routing=true the response could include data about a point on
      the road the feature fronts. Response features may include an array containing
      one or more routable points. Routable points cannot always be determined.
      Consuming applications should fall back to using the feature’s normal geometry
      for routing if a separate routable point is not returned.
    */
  routing?: boolean;

  /*
      Filter results to include only a subset (one or more) of the available feature
      types. Options are country, region, postcode, district, place, locality,
      neighborhood, address, and poi. Multiple options can be comma-separated. Note
      that poi.landmark is a deprecated type that, while still supported, returns the
      same data as is returned using the poi type.
    */
  types?: Array<MapboxPlaceType>;
}
