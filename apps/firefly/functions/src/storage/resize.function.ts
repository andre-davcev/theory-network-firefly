import { storage, EventContext } from 'firebase-functions';
import { tmpdir } from 'os';
import { join, dirname } from 'path';
import { Storage} from '@google-cloud/storage';
import * as sharp from 'sharp';

const gcs = new Storage();

const StorageResize =

storage.
object().
onFinalize(async (object: storage.ObjectMetadata, context: EventContext) =>
{
    const bucket: any                  = gcs.bucket(object.bucket);
    const filePath: string             = object.name;
    const fileType: string             = filePath.split('/')[1];
    const fileName: string             = filePath.split('/').pop();
    const fileNameParts: Array<string> = fileName.split('.');
    const filePathTemp: string         = join(tmpdir(), fileName);

    const fileNameNew: string = `${fileNameParts[0]}.resized.${fileNameParts[1]}`;
    const filePathNew: string = join(tmpdir(), fileNameNew);

    if (fileName.includes('.resized.'))
    {
        return false;
    }

    const width: number = fileType === 'images' ? 500 : 200;

    await bucket.file(filePath).download({ destination: filePathTemp });
    await sharp(filePathTemp).
        resize(width, null, { withoutEnlargement: true }).
        toFile(filePathNew);

    return bucket.upload(filePathNew,
    {
        destination: join(dirname(filePath), fileNameNew)
    });
});

export { StorageResize };

