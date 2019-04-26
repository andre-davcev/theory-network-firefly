import { Injectable } from '@angular/core';

import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable, from } from 'rxjs';
import { switchMap, map, last } from 'rxjs/operators';
import { StorageFormat } from '@theory/firebase';
import { Filesystem } from '@theory/capacitor';
import { FileReadResult } from '@capacitor/core';
import { CoreEnum } from '@theory/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Image } from '@firefly/core/models';

@Injectable({ providedIn: 'root' })
export class ServiceImage
{
    private _name: string = 'image';
    private _collection: AngularFirestoreCollection<Image>;

    constructor
    (
        private firestore: AngularFirestore,
        private storage: AngularFireStorage
    )
    {
        this.collection = this.firestore.collection<Image>(this.name);
    }

    public base64(path: string): Observable<string>
    {
        return from(Filesystem.readFile({ path })).pipe
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

    public set(image: Image): Observable<void>
    {
        return from(this.collection.doc(image.id).set(image));
    }

    public get name(): string
    {
        return this._name;
    }

    public get collection(): AngularFirestoreCollection<Image>
    {
        return this._collection;
    }

    public set collection(collection: AngularFirestoreCollection<Image>)
    {
        this._collection = collection;
    }
}
