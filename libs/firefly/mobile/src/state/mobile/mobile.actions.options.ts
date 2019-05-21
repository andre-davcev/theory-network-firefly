import { Observable } from 'rxjs';

export interface ActionMobileLoadingOptions
{
    observable$: Observable<any>;
    message?:    string;
    error?:      string;
}
