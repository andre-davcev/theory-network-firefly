import { storage, EventContext } from 'firebase-functions';
import { tmpdir } from 'os';
import { join, dirname } from 'path';
import { Storage} from '@google-cloud/storage';
import * as sharp from 'sharp';
import { remove } from 'fs-extra';

const gcs = new Storage();

const StorageResize =

storage.
object().
onFinalize(async (object: storage.ObjectMetadata, context: EventContext) =>
{
    const bucket:   any          = gcs.bucket(object.bucket);
    const filePath: string       = object.name;
    const [aspect, id, fileName] = filePath.split('/');

    if (aspect == null || id == null || fileName == null || fileName.includes('@small.') || fileName.includes('@medium.')) { return false; }

    const [name, extension] = fileName.split('.');

    const filePathTemp: string = join(tmpdir(), fileName);

    await bucket.file(filePath).download({ destination: filePathTemp });

    const fileSmallName:        string = `${name}@small.${extension}`;
    const fileSmallPath:        string = join(tmpdir(), fileSmallName);
    const fileSmallWidth:       number = 100;
    const fileSmallDestination: string = join(dirname(filePath), fileSmallName);

    await sharp(filePathTemp).resize({ width: fileSmallWidth, withoutEnlargement: true }).toFile(fileSmallPath);
    await bucket.upload(fileSmallPath, { destination: fileSmallDestination });

    const fileMediumName:        string = `${name}@medium.${extension}`;
    const fileMediumPath:        string = join(tmpdir(), fileMediumName);
    const fileMediumWidth:       number = 500;
    const fileMediumDestination: string = join(dirname(filePath), fileMediumName);

    await sharp(filePathTemp).resize({ width: fileMediumWidth, withoutEnlargement: true }).toFile(fileMediumPath);
    await bucket.upload(fileMediumPath, { destination: fileMediumDestination });

    return remove(filePathTemp);
});

export { StorageResize };

