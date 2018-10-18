
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { StoreOptions } from '@ngxs/store/src/symbols';
import { Platform } from '@ionic/angular';
import { Observable, of, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization/ngx';

import { PlatformEnum } from '@theory/ionic';
import { StateLanguageModel, StateLanguageOptions, ActionLanguageInitialize, ActionLanguageGet, ActionLanguageSet } from '@firefly/core';

@State<StateLanguageModel>(StateLanguageOptions)

export class StateLanguage
{
    constructor(private globalization: Globalization, public platform: Platform, private translate: TranslateService) {}

    @Selector() static language(state: StateLanguageModel) {return state.language;}
    @Selector() static error(state: StateLanguageModel)    {return state.error;}

    @Selector() static errored(state: StateLanguageModel) {return state.error != null;}

    ngxsOnInit(context: StateContext<StateLanguageModel>)
    {
        context.dispatch(new ActionLanguageInitialize());
    }

    @Action(ActionLanguageInitialize)
    languageInitialize()
    {
        this.translate.setDefaultLang('en');
    }

    @Action(ActionLanguageGet)
    languageGet({ patchState, dispatch }: StateContext<StateLanguageModel>)
    {
        let observable: Observable<{value:string}>;

        if (this.platform.is(PlatformEnum.Cordova))
        {
            observable = from(this.globalization.getLocaleName());
        }
        else
        {
            observable = of({value: navigator.language});
        }

        return observable.pipe
        (
            switchMap((language: {value:string}) => dispatch(new ActionLanguageSet(language.value))),

            catchError((error: Error) => of(patchState({error: error})))
        )
    }

    @Action(ActionLanguageSet)
    languageSet({ patchState }: StateContext<StateLanguageModel>, { payload }: ActionLanguageSet)
    {
        const language: string = payload;

        this.translate.use(language);

        return of(patchState({language: language}));
    }
}
