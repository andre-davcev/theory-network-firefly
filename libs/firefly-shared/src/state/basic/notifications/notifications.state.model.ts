import { PushNotification } from '@theory/firebase';

export interface StateNotificationsModel {
  notifications: Array<PushNotification>;
  notification: PushNotification;
}
