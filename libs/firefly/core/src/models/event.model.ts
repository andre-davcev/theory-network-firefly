import { Asset } from './asset.model';
import { EventKey } from './event/event.model.key';
import { Location } from './location';
import { Time } from './time';

export interface Event extends Asset
{
    [EventKey.Tagline]:   string;
    [EventKey.ImageId]:   string;
    [EventKey.Location]:  Location;
    [EventKey.Times]:     Array<Time>;
    [EventKey.Clusters]:  Record<string, string>;
    [EventKey.Url]:       string;
}
