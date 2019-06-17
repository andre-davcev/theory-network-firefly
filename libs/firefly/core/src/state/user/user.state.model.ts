import { User, Cluster, Stream } from '@firefly/core/models';
import { FormGroup } from '@angular/forms';

export interface StateUserModel
{
    authData       : firebase.User;
    user           : User;
    error          : Error;
    authenticated  : boolean;
    authenticating : boolean;
    initializing   : boolean;
    form           : FormGroup;
    empty          : User;
    clusters       : Record<string, Cluster>;
    subscriptions  : Record<string, Cluster>;
    stream         : Array<Stream>;
}
