import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, last } from 'rxjs/operators';
import { StorageFormat } from '@theory/firebase';
import { Filesystem } from '@theory/capacitor';
import { FileReadResult } from '@capacitor/core';
import { CoreEnum, ValidatorsExtended } from '@theory/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Image, Icon, Asset } from '@firefly/core/models';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { ServiceBase } from '@theory/firebase';
import { ServiceUsers } from './users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class ServiceMedia<T> extends ServiceBase<Image | Icon>
{
    public storage:     AngularFireStorage;
    public user:        ServiceUsers;
    public webview:     WebView;

    constructor
    (
        name:        string,
        firestore:   AngularFirestore,
        storage:     AngularFireStorage,
        user:        ServiceUsers,
        webview:     WebView,
        formBuilder: FormBuilder
    )
    {
        super(name, firestore, formBuilder);

        this.storage     = storage;
        this.user        = user;
        this.webview     = webview;
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

    public id(asset: Asset): string
    {
        return `${asset.userId}-${this.name}-${new Date().getTime()}.png`;
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

    public isNormalized(url: string): boolean
    {
        return url == null || !!url.match(/^data:image/) || !!url.match(/^http:/) || !!url.match(/^https:/);
    }

    public normalizeUrl(url: string): string
    {
        return this.isNormalized(url) ? url : this.webview.convertFileSrc(url);
    }

    public createWithUpload<M extends Icon | Image>(data: M, imagePath: string): Observable<M>
    {
        data.id = this.id(data);

        const bucketPath: string = this.toBucketPath(data.id);

        return this.upload(imagePath, bucketPath).pipe
        (
            switchMap(() => this.set(data)),
            map(() => data)
        );
    }

    public formCreate(object: Icon): FormGroup
    {
        return super.formCreate
        ({
            ...object,

            name        : [object.name,        [Validators.required, ValidatorsExtended.minLength(1)]],
            description : [object.description, [Validators.required, ValidatorsExtended.minLength(1)]]
        });
    }
}
