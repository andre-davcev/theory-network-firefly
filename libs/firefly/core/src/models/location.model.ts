import { DocumentReference } from '@angular/fire/firestore';

export interface Location
{
    geopoint: DocumentReference;

    name        : string;
    tagline     : string;
    description : string;
    icon        : string;
    photo       : string;
    address     : any;
    phone       : any;
    webUrl      : string;
    hours       : any;
    events      : any;
    beacons     : Array<DocumentReference>;
}
