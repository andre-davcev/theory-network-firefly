import { Event } from './event.model';
import { AlertPartial } from '../models';
import { MetadataAlert } from '../metadata';

export type Alert = Event & AlertPartial & { metadata: MetadataAlert };
