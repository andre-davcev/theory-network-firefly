import { TagEventType } from './tag-event-type.enum';
import { TagListDefault } from './tag-list-default.enum';

export type TagList = TagListDefault | TagEventType;
