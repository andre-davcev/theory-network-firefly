import { Upload } from '@firefly/core/interfaces';
import { Event } from '@firefly/core/models';

export interface StateImageModel
{
    upload : Upload;
    events : Record<string, Event>;
}
