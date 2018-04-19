import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {AngularFirestore}           from 'angularfire2/firestore';
import {AngularFirestoreCollection} from 'angularfire2/firestore';
import {AngularFirestoreDocument}   from 'angularfire2/firestore';

import {Beacon} from '../models/beacon';

@Injectable()
export class ServiceBeacons
{
    private _beacons:AngularFirestoreCollection<Beacon>;
    private _beaconsObservable:Observable<Array<Beacon>>;

    constructor(private firestore:AngularFirestore)
    {

    }

    public beaconsGet():Observable<Array<Beacon>>
    {
        this.beacons           = this.firestore.collection('beacons');
        this.beaconsObservable = this.beacons.valueChanges();

        return this.beaconsObservable;
    }

    get beacons():AngularFirestoreCollection<Beacon>
    {
        return this._beacons;
    }

    set beacons(beacons:AngularFirestoreCollection<Beacon>)
    {
        this._beacons = beacons;
    }

    get beaconsObservable():Observable<Array<Beacon>>
    {
        return this._beaconsObservable;
    }

    set beaconsObservable(beaconsObservable:Observable<Array<Beacon>>)
    {
        this._beaconsObservable = beaconsObservable;
    }
}