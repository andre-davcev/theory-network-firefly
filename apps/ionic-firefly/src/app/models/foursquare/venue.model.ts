import { VenueContact } from './venue-contact.model';
import { VenueLocation } from './venue-location.model';
import { Category } from './category.model';
import { VenueStats } from './venue-stats.model';
import { PhotoGroup } from './photo-group.model';
import { Page } from './page.model';
import { Groups } from './groups.model';
import { Phrase } from './phrase.model';
import { Hours } from './hours.model';
import { Photo } from './photo.model';

export interface Venue
{
    id            : string;
    name          : string;
    contact       : VenueContact;
    location      : VenueLocation;
    canonicalUrl  : string;
    categories    : Array<Category>;
    verified      : boolean;
    stats         : VenueStats;
    url           : string;
    likes         : {count: number; summary: string;};
    rating        : number;
    ratingColor   : string;
    ratingSignals : number;
    beenHere      : {count: number; unconfirmedCount: number; marked: boolean; lastCheckinExpiredAt: number;};
    photos        : {count: number; groups: Array<PhotoGroup>;};
    description   : string;
    storeId       : string;
    page          : Page;
    hereNow       : {count: number; summary: string; groups: Array<Groups>;};
    createdAt     : number;
    tips          : {count: number; groups: Groups};
    shortUrl      : string;
    timeZone      : string;
    listed        : {count: number; groups: Groups};
    phrases       : Array<Phrase>;
    hours         : Hours;
    popular       : Hours;
    pageUpdates   : {count: number; items: Array<any>;};
    inbox         : {count: number; items: Array<any>;};
    venueChains   : Array<any>;
    attributes    : {groups: Array<Groups>;};
    bestPhoto     : Photo;
}
