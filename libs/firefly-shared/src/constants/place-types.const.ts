import { MapboxPlaceType } from '@theory/mapbox';

import { PlaceType } from '../enums';

export const PlaceTypes: Record<PlaceType, Array<MapboxPlaceType>> =
{
    [PlaceType.Physical] :
    [
        MapboxPlaceType.PointOfInterest,
        MapboxPlaceType.PointOfInterestLandmark,
        MapboxPlaceType.Address
    ],

    [PlaceType.Virtual] :
    [
        MapboxPlaceType.Place
    ]
}
