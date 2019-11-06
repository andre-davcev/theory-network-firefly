import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { switchMap, take, filter, map } from 'rxjs/operators';

import { Cluster } from '@firefly/core/models';
import { ServiceAsset } from '@theory/firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { ValidatorsExtended } from '@theory/core';


@Injectable({ providedIn: 'root' })
export class ServiceClusters extends ServiceAsset<Cluster>
{
    constructor
    (
        firestore: AngularFirestore,
        formBuilder: FormBuilder,
        storage: AngularFireStorage
    )
    {
        super('clusters', firestore, formBuilder, storage);
    }

    private static validateIcon(): ValidatorFn
    {
        const validator: ValidatorFn = (control: AbstractControl): Record<string, any> =>
        {
            const url: string = control.value;

            return url != null ? null : { iconUrlInvalid: true };
        };

        return validator;
    }

    public formCreate(cluster: Cluster): FormGroup
    {
        return super.formCreate(
        {
            ...cluster,

            name        : [cluster.name,        [Validators.required, ValidatorsExtended.minLength(1)]],
            description : [cluster.description, [Validators.required, ValidatorsExtended.minLength(1)]],

            tagline   : [cluster.tagline, ValidatorsExtended.minLength(1)],
            imageId   : [cluster.iconId, [ServiceClusters.validateIcon()]]
        })
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

    public iconIdSet(form: FormGroup, iconId: string): void
    {
      this.patchValue(form, 'iconId', iconId);
    }

/*
    public valuesChangesClusters(keys: Record<string, string> | Array<string>, empty: Cluster): Observable<Record<string, Cluster> | Array<Cluster>>
    {
        const array$: Observable<Array<Cluster>> = this.valuesChangesFK(keys).
        pipe
        (
            switchMap((clusters: Array<Cluster>) =>
                forkJoin(clusters.map((cluster: Cluster) =>
                    this.storage.
                    ref(this.image.toBucketPath(cluster.iconId)).
                    getDownloadURL().
                    pipe
                    (
                        tap((url: string) => cluster.iconId = url),
                        map(() => cluster)
                    )
                ))
            ),
            map((subscriptions: Array<Cluster>) =>
            (
                subscriptions.map((cluster: Cluster) =>
                ({
                    ...CoreUtil.clone<Cluster>(empty),
                    ...cluster
                }))
            ))
        );

        return keys instanceof Array ?
            array$ :
            array$.
            pipe
            (
                map((subscriptions: Array<Cluster>) =>
                    subscriptions.reduce((record, cluster: Cluster): Record<string, Cluster> => {
                        record[cluster.id] = cluster;
                        return record;
                    }, {})
                )
            );
    }
*/
}
