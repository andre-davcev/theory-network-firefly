import { Pages } from '@firefly/mobile/enums';

export interface StateMobileModel
{
    loadingElement : HTMLIonLoadingElement;
    menuOpen       : boolean;
    pagesRoot      : Record<string, Pages>;
    pageRoot       : string;
}
