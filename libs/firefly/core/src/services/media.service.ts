import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, last, tap, mergeMap } from 'rxjs/operators';
import { StorageFormat, ModelKey } from '@theory/firebase';
import { Filesystem } from '@theory/capacitor';
import { FileReadResult } from '@capacitor/core';
import { CoreEnum } from '@theory/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Image, Event, Cluster, AssetKey, EventKey, Icon } from '@firefly/core/models';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { ServiceBase } from './base.service';
import { ServiceUser } from './user.service';

export class ServiceMedia<T> extends ServiceBase<Image | Icon>
{
    private _storage: AngularFireStorage;
    private _user:    ServiceUser;
    private _webview: WebView;

    constructor
    (
        name:      string,
        firestore: AngularFirestore,
        storage:   AngularFireStorage,
        user:      ServiceUser,
        webview:   WebView
    )
    {
        super(name, firestore);

        this.storage = storage;
        this.user    = user;
        this.webview = webview;
    }

    public base64(url: string): Observable<string>
    {
        const isDataUri: boolean = !!url.match(/^data:image/);

        return isDataUri ? of(url) : from(Filesystem.readFile({ path: url })).pipe
        (
            map((result: FileReadResult) => result.data),
            map((data: string) => `${CoreEnum.DataUri}${data}`)
        );
    }

    public upload(filePath: string, path: string): Observable<string>
    {
        const ref: AngularFireStorageReference = this.storage.ref(path);

        return this.base64(filePath).
        pipe
        (
            map((image: string) => ref.putString(image, StorageFormat.DataUrl)),
            switchMap((task: AngularFireUploadTask) => task.snapshotChanges()),
            last(),
            switchMap(() => ref.getDownloadURL())
        );
    }

    public createWithUpload(event: Event, imagePath: string): Observable<Event>
    {
        const image:      Image | Icon = this.fromEvent(event);
        const bucketPath: string       = this.toBucketPath(image[ModelKey.Id]);

        event =
        {
            ...event,
            [EventKey.ImageId]: image[ModelKey.Id]
        };

        return this.upload(imagePath, bucketPath).pipe
        (
            switchMap(() => this.set(image)),
            mergeMap(() =>
              this.user.foreignKeyUpdate(image[AssetKey.UserId], this.name, image[ModelKey.Id])
            ),
            map(() => event)
        );
    }

    private id(event: Event): string
    {
        return `${event.userId}-${this.name}-${new Date().getTime()}.png`;
    }

    public toId(bucketPath: string): string
    {
        return bucketPath.replace(/\//g, '-');
    }

    public toBucketPath(id: string): string
    {
        return id.replace(/-/g, '/');
    }

    public getDownloadUrl(id: string): Observable<string | null>
    {
        return of(id).
        pipe
        (
            map((key: string) => this.toBucketPath(key)),
            map((bucketPath: string) => this.storage.ref(bucketPath)),
            switchMap((ref: AngularFireStorageReference) => ref.getDownloadURL())
        );
    }

    public fromEvent(event: Event): Image | Icon
    {
        const image: Image | Icon =
        {
            [ModelKey.Id]          : this.id(event),
            [AssetKey.Name]        : '',
            [AssetKey.Description] : '',
            [AssetKey.Private]     : true,
            [AssetKey.UserId]      : event.userId,
            [AssetKey.Draft]       : false
        };

        return image;
    }

    public isNormalized(url: string): boolean
    {
        return !!url.match(/^data:image/) || !!url.match(/^http:/) || !!url.match(/^https:/);
    }

    public normalizeUrl(url: string): string
    {
        return this.isNormalized(url) ? url : this.webview.convertFileSrc(url);
    }

    public get storage(): AngularFireStorage
    {
        return this._storage;
    }

    public set storage(storage: AngularFireStorage)
    {
        this._storage = storage;
    }

    protected get user(): ServiceUser
    {
        return this._user;
    }

    protected set user(user: ServiceUser)
    {
        this._user = user;
    }

    protected get webview(): WebView
    {
        return this._webview;
    }

    protected set webview(webview: WebView)
    {
        this._webview = webview;
    }
}
