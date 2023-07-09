import { storage } from 'firebase-admin';

import { FIREBASE_CONFIG } from '../constants';

export class ServiceStorage {
  public static bucketPaths(bucketPath: string): Array<string> {
    const segments: Array<string> = bucketPath.split('/');
    const fileName: string = segments.pop();
    const fileParts: Array<string> = fileName.split('.');

    const bucketPaths: Array<string> = ['small', 'medium'].map((size: string) =>
      [...segments, `${fileParts[0]}@${size}.${fileParts[1]}`].join('/')
    );

    bucketPaths.push(bucketPath);

    return bucketPaths;
  }

  public static delete(bucketPath: string): Promise<any> {
    const bucket: any = storage().bucket(FIREBASE_CONFIG.storageBucket);

    const deletes: Array<Promise<any>> = ServiceStorage.bucketPaths(
      bucketPath
    ).map((path: string) => bucket.file(path).delete());

    return Promise.all(deletes);
  }

  public static bucket(project: string): string {
    return `${project}.appspot.com`;
  }
}
