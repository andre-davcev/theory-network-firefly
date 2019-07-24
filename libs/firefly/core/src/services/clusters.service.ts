import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, from, forkJoin } from 'rxjs';
import { switchMap, take, filter, map, tap } from 'rxjs/operators';

import { Cluster } from '@firefly/core/models';
import { ServiceBase } from './base.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ServiceImages } from './images.service';
import { FormGroup, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { ValidatorsExtended, CoreEnum, CoreUtil } from '@theory/core';


@Injectable({ providedIn: 'root' })
export class ServiceClusters extends ServiceBase<Cluster>
{
    constructor
    (
        firestore: AngularFirestore,
        private storage: AngularFireStorage,
        private image: ServiceImages,
        private formBuilder: FormBuilder
    )
    {
        super('clusters', firestore);
    }

    private _form: FormGroup;

    private static validateIcon(): ValidatorFn
    {
        const validator: ValidatorFn = (control: AbstractControl): Record<string, any> =>
        {
            const url: string = control.value;

            return url != null ? null : { iconUrlInvalid: true };
        };

        return validator;
    }

    public build(userId: string, defaults: Cluster): Cluster
    {
      const cluster: Cluster =
      {
        ...this.clone(defaults),
        id: CoreEnum.IdNew,
        userId: userId
      };

      return cluster;
    }

    public formCreate(cluster: Cluster): FormGroup
    {
      const form: FormGroup = this.formBuilder.group
        ({
            id          : cluster.id,
            dateCreated : cluster.dateCreated,
            dateUpdated : cluster.dateUpdated,

            userId      : cluster.userId,
            name        : [cluster.name,        [Validators.required, ValidatorsExtended.minLength(1)]],
            description : [cluster.description, [Validators.required, ValidatorsExtended.minLength(1)]],
            private     : cluster.private,
            draft       : cluster.draft,

            tagline   : [cluster.tagline, ValidatorsExtended.minLength(1)],
            iconId   : [cluster.iconId, [ServiceClusters.validateIcon()]]
        });

        this._form = form;

        return form;
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

    public get form(): FormGroup
    {
      return this._form;
    }
}
