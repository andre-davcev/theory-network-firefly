import { StateReferenceTableModel } from '@theory/ngxs';
import { Event, ImageEvent } from '@firefly/core/models';

export interface StateImageEventsModel extends StateReferenceTableModel<ImageEvent, Event>
{

}
