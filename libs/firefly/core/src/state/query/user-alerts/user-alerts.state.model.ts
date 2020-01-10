import { StateQueryModel } from '@theory/ngxs';
import { Alert } from '@firefly/cloud';

export interface StateUserAlertsModel extends StateQueryModel<Alert>
{
    unread: number;
}
