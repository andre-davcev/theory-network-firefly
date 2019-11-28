import { StateReferenceTableModel } from '@theory/ngxs';
import { Alert, UserAlert } from '@firefly/core/models';

export interface StateUserAlertsModel extends StateReferenceTableModel<UserAlert, Alert>
{

}
