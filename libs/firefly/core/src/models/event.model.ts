import { Asset } from './asset.model';
import { Location } from './location.model';
import { Time } from './time.model';

export interface Event extends Asset
{
    tagline:   string;
    imageId:   string;
    location:  Location;
    times:     Array<Time>;
    clusters:  Record<string, string>;
    url:       string;
}
