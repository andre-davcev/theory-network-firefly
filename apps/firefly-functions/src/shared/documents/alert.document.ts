import { Event } from './event.document';
import { AlertPartial } from '../../library/models';
import { MetadataAlert } from '../../library/metadata';

export type Alert = Event & AlertPartial & { metadata: MetadataAlert };
