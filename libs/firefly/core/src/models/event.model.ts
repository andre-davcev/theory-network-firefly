import { Asset } from './asset.model';
import { EventKey } from './event.model.key';
import { Location } from './location.model';
import { Time } from './time.model';

export interface Event extends Asset
{
    [EventKey.Tagline]:   string;
    [EventKey.ImageId]:   string;
    [EventKey.Location]:  Location;
    [EventKey.Times]:     Array<Time>;
    [EventKey.Clusters]:  Record<string, string>;
    [EventKey.Url]:       string;
}
