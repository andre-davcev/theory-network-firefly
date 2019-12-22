import { Pages } from '@firefly/mobile/enums';

export interface StateMobileModel
{
    loadingElement : HTMLIonLoadingElement;
    menuOpen       : boolean;
    rootPages      : Record<string, Pages>;
}
