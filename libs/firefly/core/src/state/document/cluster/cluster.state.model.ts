import { StateDocumentModel } from '@theory/ngxs';
import { Event } from '@firefly/cloud';

export interface StateClusterModel extends StateDocumentModel
{
  events: Event[]
}
