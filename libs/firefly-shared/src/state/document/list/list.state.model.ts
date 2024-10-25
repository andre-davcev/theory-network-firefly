import { Event } from '@firefly/cloud';
import { StateDocumentModel } from '@theory/ngxs';

export interface StateListModel extends StateDocumentModel {
  events: Record<string, Array<Event>>;
  eventsPending: Record<string, Array<Event>>;
}
