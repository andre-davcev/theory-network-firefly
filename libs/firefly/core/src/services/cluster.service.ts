import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { switchMap, take, filter, map } from 'rxjs/operators';

import { Cluster } from '@firefly/core/models';
import { ServiceBase } from './base.service';

@Injectable({ providedIn: 'root' })
export class ServiceCluster extends ServiceBase<Cluster>
{
    constructor (firestore: AngularFirestore)
    {
        super('clusters', firestore);
    }

    getClusters(userid:String): Observable<Cluster[]>
    {
     // let dumKey = 1;
     /* const cluster1: Cluster = {
        name        : 'name1',
        tagline     : 'tagline1',
        description : 'description1',
        icon        : 'https://loremflickr.com/640/360',
        photo       : 'photo',
        categories  : 'categories',
        private     : false
      }

      const cluster2: Cluster = {
        name        : 'name2',
        tagline     : 'tagline2',
        description : 'description2',
        icon        : 'https://loremflickr.com/640/360',
        photo       : 'photo',
        categories  : 'categories',
        private     : false
      }
      const clusters:Cluster[] = [cluster1,cluster2];*/
        /*const dummyData = {
          id: 100,
          categories: "dummy"
        }*/

        /*const clusters: Cluster[] =[];
        return of(clusters)
        .pipe(
          map(actions => {
            return actions.map(a => {
              dumKey++;
              const id = dumKey.toString();
              const dumA = a;
              console.log("dumId" + id);
              console.log("a: " + JSON.stringify(dumA));
              return { id, ...dumA};
            })
          })
        );*/

        return this.firestore.collection<Cluster>('clusters', ref => {
            return ref.where('userId', '==', 'myuser')
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

    setCluster(cluster:Cluster): Observable<Cluster>
    {
        const id = this.firestore.createId();
        cluster.id = id;
        console.log(cluster.id);
        cluster.userId = 'myuser';
        cluster.iconId = 'https://loremflickr.com/640/360';
        const document: AngularFirestoreDocument<Cluster> = this.collection.doc(id) as AngularFirestoreDocument<Cluster>;

        return from(document.set(cluster)).pipe
        (
            switchMap(() => document.valueChanges()),

            filter((c: Cluster) => cluster.dateCreated != null),

            take(1)
        );
    }
}
