import { Event } from './event.model';
import { MetadataAlert, AlertPartial } from '../models';

export type Alert = Event & AlertPartial & { metadata?: MetadataAlert };
