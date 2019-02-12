import { Injectable, Inject } from '@angular/core';
import { MapboxEnvironment } from '@firefly/core';
import { EnvironmentMapbox } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class ServiceSearch
{
    constructor(@Inject(MapboxEnvironment) private environment: EnvironmentMapbox)
    {

    }
/*
GET
/geocoding/v5/{endpoint}/{longitude},{latitude}.json
The reverse geocoding query type allows you to look up a single pair of coordinates and returns the geographic feature or features that exist at that location.

Batch geocoding is only available with an Enterprise plan. For other plan levels, one geocode is permitted per request.

Try reverse geocoding in the Search Playground.

Required parameters	Description
endpoint	One of mapbox.places or mapbox.places-permanent, as described in the Endpoints section.
longitude,latitude	A longitude,latitude pair that specifies the location being queried.
You can further refine the results of a reverse geocoding query with the following optional parameters:

Optional parameters	Description
country	Limit results to one or more countries. Permitted values are ISO 3166 alpha 2 country codes separated by commas.
language	Specify the user’s language. This parameter controls the language of the text supplied in responses.

Options are IETF language tags comprised of a mandatory ISO 639-1 language code and, optionally, one or more IETF subtags for country or script.

More than one value can also be specified, separated by commas, for applications that need to display labels in multiple languages.

For more information on which specific languages are supported, see the language coverage section.
limit	Specify the maximum number of results to return. The default is 1 and the maximum supported is 10.

The default behavior in reverse geocoding is to return at most one feature at each of the multiple levels of the administrative hierarchy (for example, one address, one region, one country). Increasing the limit allows returning multiple features of the same type, but only for one type (for example, multiple address results). Consequently, setting limit to a higher-than-default value requires specifying exactly one types parameter.
reverseMode	Decides how results are sorted in a reverse geocoding query if multiple results are requested using a limit other than 1. Options are distance (default), which causes the closest feature to always be returned first, and score, which allows high-prominence features to be sorted higher than nearer, lower-prominence features.
routing	Specify whether to request additional metadata about the recommended navigation destination corresponding to the feature (true) or not (false, default). Only applicable for address features.

For example, if routing=true the response could include data about a point on the road the feature fronts. Response features may include an array containing one or more routable points. Routable points cannot always be determined. Consuming applications should fall back to using the feature’s normal geometry for routing if a separate routable point is not returned.
types	Filter results to include only a subset (one or more) of the available feature types. Options are country, region, postcode, district, place, locality, neighborhood, address, and poi. Multiple options can be comma-separated. Note that poi.landmark is a deprecated type that, while still supported, returns the same data as is returned using the poi type.

For more information on the available types, see the data types section.
Example request: Reverse geocoding
# A basic reverse geocoding request
# Retrieve places near a specific location

$ curl "https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=pk.eyJ1IjoidGhlb3J5bmV0d29yayIsImEiOiJjamdwem04eGwwMXVsMnZwaGR2YzZxdGxvIn0.1mwIacOT0bTANo6lueSQmg"

# Filter results to only include points of interest

$ curl "https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?types=poi&access_token=pk.eyJ1IjoidGhlb3J5bmV0d29yayIsImEiOiJjamdwem04eGwwMXVsMnZwaGR2YzZxdGxvIn0.1mwIacOT0bTANo6lueSQmg"
*/
}
