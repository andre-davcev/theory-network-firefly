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
    const bucket: any          = gcs.bucket(object.bucket);
    const filePath: string     = object.name;
    const fileType: string     = filePath.split('/')[1];
    const fileName: string     = filePath.split('/').pop();

    if (fileName.includes('.small') || fileName.includes('.medium'))
    {
        return false;
    }

    const filePathTemp:  string = join(tmpdir(), fileName);

    await bucket.file(filePath).download({ destination: filePathTemp });

    const fileSmallName:        string = `${fileName}.small`;
    const fileSmallPath:        string = join(tmpdir(), fileSmallName);
    const fileSmallWidth:       number = 100;
    const fileSmallDestination: string = join(dirname(filePath), fileSmallName);

    await sharp(filePathTemp).resize(fileSmallWidth, null, { withoutEnlargement: true }).toFile(fileSmallPath);
    await bucket.upload(fileSmallPath, { destination: fileSmallDestination });

    const fileMediumName:        string = `${fileName}.medium`;
    const fileMediumPath:        string = join(tmpdir(), fileMediumName);
    const fileMediumWidth:       number = fileType === 'images' ? 500 : 200;
    const fileMediumDestination: string = join(dirname(filePath), fileMediumName);

    await sharp(filePathTemp).resize(fileMediumWidth, null, { withoutEnlargement: true }).toFile(fileMediumPath);
    return bucket.upload(fileMediumPath, { destination: fileMediumDestination });
});

export { StorageResize };

