import { Asset } from './asset.model';
import { EventKey } from './event.model.enum';

export interface Event extends Asset
{
    [EventKey.Tagline]:  string;
    [EventKey.ImageId]:  string;
    [EventKey.PlaceId]:  string;
    [EventKey.Clusters]: Array<string>;
}
