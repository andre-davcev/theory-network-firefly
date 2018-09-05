import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { switchMap, take, filter, map } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { Cluster } from '../models/cluster.model';

@Injectable({providedIn: 'root'})
export class ServiceCluster
{
    private clustersCollection: AngularFirestoreCollection<Cluster>;

    constructor (private afs: AngularFirestore){
        this.clustersCollection = afs.collection<Cluster>('clusters');
    }

    getClusters(userid:String): Observable<Cluster[]>
    {
        return this.afs.collection<Cluster>('clusters', ref => {
            return ref.where('userid', '==', userid)
        })
        .snapshotChanges()
        .pipe(
          map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Cluster;
                const id = a.payload.doc.id;
                return { id, ...data };
            })
        }));
    }

    updateCluster()
    {

    }

    setCluster(cluster:Cluster): Observable<Cluster>
    {
        const id = this.afs.createId();
        cluster.id = id;
        const document: AngularFirestoreDocument<Cluster> = this.clustersCollection.doc(id) as AngularFirestoreDocument<Cluster>;

        return fromPromise(document.set(cluster)).pipe
        (
            switchMap(() => document.valueChanges()),

            filter((cluster: Cluster) => cluster.dateCreated != null),

            take(1)
        );
    }
}
