import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable, from, of } from 'rxjs';
import { switchMap, map, last } from 'rxjs/operators';
import { FileReadResult, Plugins, Capacitor } from '@capacitor/core';
import { CoreEnum } from '@theory/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';

import { ServiceBase } from './base.service';
import { StorageFormat } from '../enums';

const { Filesystem } = Plugins;

export class ServiceAsset<T> extends ServiceBase<T>
{
    public storage: AngularFireStorage;

    public readonly separator: string = '###';

    constructor
    (
        name:        string,
        firestore:   AngularFirestore,
        formBuilder: FormBuilder,
        storage:     AngularFireStorage,
        reference?:  boolean
    )
    {
        super(name, firestore, formBuilder, reference);

        this.storage = storage;
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

    public id(asset: T): string
    {
        return `${asset['userId']}${this.separator}${this.name}${this.separator}${new Date().getTime()}.png`;
    }

    public toId(bucketPath: string): string
    {
        return bucketPath.replace(/\//g, this.separator);
    }

    public toBucketPath(id: string): string
    {
        return id.replace(/###/g, '/');
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
        return this.isNormalized(url) ? url : `${CoreEnum.DataUri}/${url}`;
        // return this.isNormalized(url) ? url : Capacitor.convertFileSrc(url);
    }
  }
