import { MapboxPlaceType } from '../enums'

export interface ParamsForwardGeocode
{
    /*
      Specify whether to return autocomplete results (true, default) or not (false).
      When autocomplete is enabled, results will be included that start with the
      requested string, rather than just responses that match it exactly. For
      example, a query for India might return both India and Indiana with
      autocomplete enabled, but only India if it’s disabled.

      When autocomplete is enabled, each user keystroke counts as one request to
      the Geocoding API. For example, a search for "coff" would be reflected as
      four separate Geocoding API requests. To reduce the total requests sent, you
      can configure your application to only call the Geocoding API after a
      specific number of characters are typed.

    */
    autocomplete?: boolean;

    /*
      Limit results to only those contained within the supplied bounding box.
      Bounding boxes should be supplied as four numbers separated by commas,
      in minLon,minLat,maxLon,maxLat order. The bounding box cannot cross the
      180th meridian.
    */
    bbox?: [number, number, number, number];

    /*
      Limit results to one or more countries. Permitted values are ISO 3166
      alpha 2 country codes separated by commas.
    */
    country?: string;

    /*
      Specify whether the Geocoding API should attempt approximate, as well
      as exact, matching when performing searches (true, default), or whether
      it should opt out of this behavior and only attempt exact matching (false).
      For example, the default setting might return Washington, DC for a query
      of wahsington, even though the query was misspelled.
    */
    fuzzyMatch?: boolean;

    /*
      Specify the user’s language. This parameter controls the language of the
      text supplied in responses, and also affects result scoring, with results
      matching the user’s query in the requested language being preferred over
      results that match in another language. For example, an autocomplete
      query for things that start with Frank might return Frankfurt as the first
      result with an English (en) language parameter, but Frankreich (“France”)
      with a German (de) language parameter.

      Options are IETF language tags comprised of a mandatory ISO 639-1 language
      code and, optionally, one or more IETF subtags for country or script.

      More than one value can also be specified, separated by commas, for
      applications that need to display labels in multiple languages.

      For more information on which specific languages are supported, see the
      language coverage section.
    */
    language?: string;

    /*
      Specify the maximum number of results to return. The default is 5 and the
      maximum supported is 10.
    */
    limit?: number;

    /*
      Bias the response to favor results that are closer to this location,
      provided as two comma-separated coordinates in longitude,latitude order.
    */
    proximity?: [number, number];

    /*
      Specify whether to request additional metadata about the recommended
      navigation destination corresponding to the feature (true) or not
      (false, default). Only applicable for address features.

      For example, if routing=true the response could include data about a
      point on the road the feature fronts. Response features may include
      an array containing one or more routable points. Routable points
      cannot always be determined. Consuming applications should fall back
      to using the feature’s normal geometry for routing if a separate
      routable point is not returned.
    */

    routing?: boolean;

    /*
      Filter results to include only a subset (one or more) of the available
      feature types. Options are country, region, postcode, district, place,
      locality, neighborhood, address, and poi. Multiple options can be
      comma-separated. Note that poi.landmark is a deprecated type that,
      while still supported, returns the same data as is returned using
      the poi type.

      For more information on the available types, see the data types section.
    */
    types?: Array<MapboxPlaceType>;
}
