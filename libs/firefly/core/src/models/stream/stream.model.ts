import { Cluster } from '../cluster';
import { StreamKey } from './stream.model.key';

export interface Stream extends Cluster
{
    [StreamKey.Index]:           number;
    [StreamKey.Subscribed]:      boolean;
    [StreamKey.SubscribedCount]: number;
}
