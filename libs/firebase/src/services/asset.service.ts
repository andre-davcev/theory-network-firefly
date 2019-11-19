import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { switchMap, map, last } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';

import { ServiceBase } from './base.service';
import { StorageFormat, ImageSize } from '../enums';

export class ServiceAsset<T> extends ServiceBase<T>
{
    public storage: AngularFireStorage;

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

    public addMetadata(asset: T): T
    {
        const url: string = asset['url'];

        asset['id']        = this.firestore.createId();
        asset['mediaType'] = this.name === 'images' ? 'jpeg' : 'png';

        if (url != null)
        {
            const start: number = url.indexOf('/') + 1;
            const end:   number = url.indexOf(';');

            asset['mediaType'] = url.substring(start, end);
        }

        asset['bucketPath'] = `${asset['userId']}/${this.name}/${asset['id']}.${asset['mediaType']}`;

        return asset;
    }

    public toBucketPathSize(path: string, size: ImageSize = ImageSize.Medium): string
    {
        const segments: Array<string> = path.split('/');
        const fileName: string        = segments[2];
        const parts:    Array<string> = fileName.split('.');
        const bucketPath: string      = `${segments[0]}/${segments[1]}/${parts[0]}@${size}.${parts[1]}`;

        return bucketPath;
    }

    public getDownloadUrl(path: string, size?: ImageSize): Observable<string | null>
    {
        return path == null ? of(null) : of(path).
        pipe
        (
            map((path: string) =>
                size == null ? path : this.toBucketPathSize(path, size)
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
