import { PlaceType } from '../enums';
import { MapboxPlaceType } from '@theory/mapbox';

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
