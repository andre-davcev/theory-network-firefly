import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { switchMap, map, last } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';

import { ServiceBase } from './base.service';
import { StorageFormat, ImageSize } from '../enums';
import { CoreEnum } from '@theory/core';

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
        const url:       string = asset['url'];
        const start:     number = url.indexOf(':');
        const end:       number = url.indexOf(';') - 1;
        const mediaType: string = url.substring(start, end);

        return `${asset['userId']}${this.separator}${this.name}${this.separator}${new Date().getTime()}.${mediaType}`;
    }

    public toId(bucketPath: string): string
    {
        return bucketPath.replace(/\//g, this.separator);
    }

    public toBucketPath(id: string): string
    {
        return id.replace(/###/g, '/');
    }

    public toBucketPathSize(id: string, size: ImageSize = ImageSize.Medium): string
    {
        const segments: Array<string> = this.toBucketPath(id).split('/');
        const fileName: string        = segments[2];
        const parts:    Array<string> = fileName.split('.');
        const bucketPath: string      = `${segments[0]}/${segments[1]}/${parts[0]}@${size}.${parts[1]}`;

        return bucketPath;
    }

    public getDownloadUrl(id: string, size?: ImageSize): Observable<string | null>
    {
        return id == null || id === CoreEnum.IdNew ? of(null) : of(id).
        pipe
        (
            map((key: string) =>
                size == null ? this.toBucketPath(key) : this.toBucketPathSize(key, size)
            ),
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
