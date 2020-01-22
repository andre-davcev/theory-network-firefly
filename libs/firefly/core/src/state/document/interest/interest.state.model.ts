import { StateDocumentModel } from '@theory/ngxs';
import { Event } from '@firefly/cloud';

export interface StateInterestModel extends StateDocumentModel
{
  events: Event[]
}
