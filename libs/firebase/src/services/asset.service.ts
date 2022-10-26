import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { UntypedFormBuilder } from '@angular/forms';

import { ServiceBase } from './base.service';
import { ImageSize } from '../enums';

export class ServiceAsset<T> extends ServiceBase<T>
{
    public storage: AngularFireStorage;

    constructor
    (
        name:        string,
        firestore:   AngularFirestore,
        formBuilder: UntypedFormBuilder,
        storage:     AngularFireStorage,
        reference?:  boolean
    )
    {
        super(name, firestore, formBuilder, reference);

        this.storage = storage;
    }

    public addMetadata(asset: T): T
    {
        asset['id'] = this.firestore.createId();

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
  }
