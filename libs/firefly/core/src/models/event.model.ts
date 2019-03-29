import { Asset } from './asset.model';
import { EventKey } from './event.model.enum';
import { Location } from '@firefly/core/models';

export interface Event extends Asset
{
    [EventKey.Tagline]:   string;
    [EventKey.ImageId]:   string;
    [EventKey.PlaceId]:   string;
    [EventKey.Clusters]:  Array<string>;
    [EventKey.Location]:  Location;
    [EventKey.TimeStart]: string;
    [EventKey.TimeEnd]:   string;
}
