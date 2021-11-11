import { StateDocumentModel } from '@theory/ngxs';
import { Event } from '@firefly/cloud';

export interface StateInterestModel extends StateDocumentModel
{
    events        : Record<string, Array<Event>>;
    eventsPending : Record<string, Array<Event>>;
}
