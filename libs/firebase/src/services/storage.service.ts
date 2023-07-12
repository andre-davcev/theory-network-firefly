import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/compat/storage';
import { Observable, of } from 'rxjs';
import { catchError, filter, last, map, switchMap } from 'rxjs/operators';
import { ImageSize, StorageFormat } from '../enums';

@Injectable({ providedIn: 'root' })
export class ServiceStorage {
  constructor(private storage: AngularFireStorage) {}

  public static idFromPath(bucketPath: string): string {
    return (bucketPath?.split('/')?.pop() || '.').split('.')[0] || '';
  }

  public mediaType(data: string): string {
    const start: number = data.indexOf('/') + 1;
    const end: number = data.indexOf(';');

    return data.substring(start, end);
  }

  public bucketPath(path: string, size: ImageSize = ImageSize.Medium): string {
    if (
      size == null ||
      size === ImageSize.None ||
      size === ImageSize.Original
    ) {
      return path;
    }

    const segments: Array<string> = path.split('/');
    const fileName: string = segments.pop() || '.';
    const fileParts: Array<string> = fileName.split('.');

    segments.push(`${fileParts[0]}@${size}.${fileParts[1]}`);

    return segments.join('/');
  }

  public downloadUrl(
    path: string,
    size?: ImageSize
  ): Observable<string | null> {
    return path == null
      ? of(null)
      : of(path).pipe(
          map((path: string) => this.bucketPath(path, size)),
          map((bucketPath: string) => this.storage.ref(bucketPath)),
          switchMap((ref: AngularFireStorageReference) => ref.getDownloadURL()),
          catchError(() => this.storage.ref(path).getDownloadURL())
        );
  }

  public storageUpload(
    dataUri: string,
    bucketPath: string
  ): Observable<string> {
    if (dataUri == null) {
      return of('');
    }

    const ref: AngularFireStorageReference = this.storage.ref(bucketPath);
    const task: AngularFireUploadTask = ref.putString(
      dataUri,
      StorageFormat.DataUrl
    );

    return task.percentageChanges().pipe(
      filter((uploadProgress: number | undefined) => uploadProgress === 100),
      switchMap(() => task.snapshotChanges()),
      last(),
      switchMap(() => ref.getDownloadURL())
    );
  }
}
