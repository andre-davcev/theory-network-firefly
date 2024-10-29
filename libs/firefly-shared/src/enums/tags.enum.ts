import { Pages } from './pages.enum';

export type PageTab =
  | Pages.Events
  | Pages.Lists
  | Pages.Notifications
  | Pages.Calendar
  | Pages.NonTab;
