import * as firebase from 'firebase';

export interface Location
{
    geopoint: firebase.firestore.DocumentReference;

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
    beacons     : Array<firebase.firestore.DocumentReference>;
}