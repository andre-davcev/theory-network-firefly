import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { switchMap, map, last } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';

import { ServiceBase } from './base.service';
import { StorageFormat } from '../enums';

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

    public upload(filePath: string, path: string): Observable<string>
    {
        const ref: AngularFireStorageReference = this.storage.ref(path);

        return of(filePath).
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
        return `${asset['userId']}${this.separator}${this.name}${this.separator}${new Date().getTime()}`;
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

    public static isDataUrl(url: string): boolean
    {
        return !!url.match(/^data:image/);
    }

    public static isWebUrl(url: string): boolean
    {
        return !!url.match(/^http:/) || !!url.match(/^https:/);
    }
  }
