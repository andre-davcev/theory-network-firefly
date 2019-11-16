import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Icon } from '@firefly/core/models';
import { AngularFireStorage } from '@angular/fire/storage';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceAsset } from '@theory/firebase';

@Injectable({ providedIn: 'root' })
export class ServiceIcons extends ServiceAsset<Icon>
{
    constructor
    (
        firestore:   AngularFirestore,
        formBuilder: FormBuilder,
        storage:     AngularFireStorage
    )
    {
        super('icons', firestore, formBuilder, storage);
    }

    public formCreate(object: Icon): FormGroup
    {
        return super.formCreate(
        {
            ...object
        });
    }

    public createWithUpload(data: Icon, imagePath: string): Observable<Icon>
    {
        data = this.addMetadata(data);

        return this.upload(imagePath, data.bucketPath).pipe
        (
            switchMap(() => this.set(data)),
            map(() => data)
        );
    }

/*
    getIcons(userId: String): Observable<Array<Icon>>
    {
        return this.firestore.collection<Icon>('icons', ref =>
        {
            return ref.where('userid', '==', userId)
        }).

        snapshotChanges().

        pipe(
          map((actions: Array<DocumentChangeAction<any>>) => {
            return actions.map(action =>
            {
                const data: Icon = action.payload.doc.data() as Icon;
                const id         = action.payload.doc.id;

                return { id, ...data };
            })
        }));
    }

    private idCluster(cluster: Cluster): string
    {
        return `${cluster.userId}-${this.name}-${new Date().getTime()}`;
    }


    public fromCluster(cluster: Cluster): Icon
    {
        const image: Icon =
        {
            id          : this.idCluster(cluster),
            name        : '',
            description : '',
            private     : true,
            userId      : cluster.userId,
            draft       : false
        };

        return image;
    }

    public createWithUploadForCluster(cluster: Cluster, imagePath: string): Observable<Cluster>
    {
        const image:      Icon = this.fromCluster(cluster);
        const bucketPath: string       = this.toBucketPath(image.id);

        cluster =
        {
            ...cluster,
            imageId: image.id
        };

        return this.upload(imagePath, bucketPath).pipe
        (
            switchMap(() => this.set(image)),
            mergeMap(() =>
              this.user.foreignKeyUpdate(image.userId, this.name, image.id)
            ),
            map(() => cluster)
        );
    }

    setIcon(icon: Icon): Observable<Icon>
    {
        const id = this.firestore.createId();

        icon.id = id;
        const document: AngularFirestoreDocument<Icon> = this.document(id) as AngularFirestoreDocument<Icon>;

        return from(document.set(icon)).pipe
        (
            switchMap(() => document.valueChanges()),

            filter((ico: Icon) => ico.dateCreated != null),

            take(1)
        );
    }
*/
}
