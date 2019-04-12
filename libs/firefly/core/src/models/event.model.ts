import { Asset } from './asset.model';
import { EventKey } from './event.model.enum';
import { Location } from './location.model';
import { EventVersion } from './event.model.version';
import { Time } from './time.model';

export interface Event extends Asset
{
    [EventKey.Version]:   EventVersion
    [EventKey.Tagline]:   string;
    [EventKey.ImageId]:   string;
    [EventKey.Clusters]:  Array<string>;
    [EventKey.Location]:  Location;
    [EventKey.Times]:     Array<Time>;
}
