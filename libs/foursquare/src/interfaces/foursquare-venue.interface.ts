import { FoursquarePhoto, FoursquareVenueContact, FoursquareVenueLocation, FoursquareCategory, FoursquareVenueStats, FoursquarePhotoGroup, FoursquarePage, FoursquareGroups, FoursquarePhrase, FoursquareHours } from '.';

export interface FoursquareVenue
{
    id            : string;
    name          : string;
    contact       : FoursquareVenueContact;
    location      : FoursquareVenueLocation;
    canonicalUrl  : string;
    categories    : Array<FoursquareCategory>;
    verified      : boolean;
    stats         : FoursquareVenueStats;
    url           : string;
    likes         : {count: number; summary: string;};
    rating        : number;
    ratingColor   : string;
    ratingSignals : number;
    beenHere      : {count: number; unconfirmedCount: number; marked: boolean; lastCheckinExpiredAt: number;};
    photos        : {count: number; groups: Array<FoursquarePhotoGroup>;};
    description   : string;
    storeId       : string;
    page          : FoursquarePage;
    hereNow       : {count: number; summary: string; groups: Array<FoursquareGroups>;};
    createdAt     : number;
    tips          : {count: number; groups: FoursquareGroups};
    shortUrl      : string;
    timeZone      : string;
    listed        : {count: number; groups: FoursquareGroups};
    phrases       : Array<FoursquarePhrase>;
    hours         : FoursquareHours;
    popular       : FoursquareHours;
    pageUpdates   : {count: number; items: Array<any>;};
    inbox         : {count: number; items: Array<any>;};
    venueChains   : Array<any>;
    attributes    : {groups: Array<FoursquareGroups>;};
    bestPhoto     : FoursquarePhoto;
}
