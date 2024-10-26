import { Tag } from './tag.model';

export interface TagEvent<T> {
  index: number;
  tag: Tag<T>;
}
