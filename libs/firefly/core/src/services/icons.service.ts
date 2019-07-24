import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { switchMap, filter, take, map, mergeMap } from 'rxjs/operators';

import { Icon } from '@firefly/core/models';
import { ServiceMedia } from './media.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ServiceUser } from './user.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { Cluster } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceIcons extends ServiceMedia<Icon>
{
    constructor
    (
        firestore: AngularFirestore,
        storage:   AngularFireStorage,
        user:      ServiceUser,
        webview:   WebView
    )
    {
        super('icons', firestore, storage, user, webview);
    }

    get(userId: String): Observable<Array<Icon>>
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
        return `${cluster.userId}-${this.name}-${new Date().getTime()}.png`;
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
            iconId: image.id
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

    update()
    {

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
}
