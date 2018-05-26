export interface Notification
{
    'gcm.message_id' : string;
    tap?             : boolean;
    aps              : {alert: {title: string; body: string}};
    notificationId   : string;
}
