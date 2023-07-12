import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  ActionLanguageGet,
  ActionLanguageInitialize,
  ActionLanguageSet
} from './language.actions';
import { StateLanguageModel } from './language.state.model';
import { StateLanguageOptions } from './language.state.options';

@State<StateLanguageModel>(StateLanguageOptions)
@Injectable()
export class StateLanguage {
  constructor(private translate: TranslateService) {}

  @Selector() static language(state: StateLanguageModel): string {
    return state.language || 'en-us';
  }

  @Selector() static error(state: StateLanguageModel): any {
    return state.error;
  }

  @Selector() static errored(state: StateLanguageModel): boolean {
    return state.error != null;
  }

  @Selector() static languageIso639_1(state: StateLanguageModel): string {
    const language: string = StateLanguage.language(state);

    return language.split('-')[0].toLowerCase();
  }

  ngxsOnInit(context: StateContext<StateLanguageModel>) {
    context.dispatch([new ActionLanguageInitialize(), new ActionLanguageGet()]);
  }

  @Action(ActionLanguageInitialize)
  languageInitialize() {
    this.translate.setDefaultLang('en');
  }

  @Action(ActionLanguageGet)
  languageGet({ patchState, dispatch }: StateContext<StateLanguageModel>) {
    from(Device.getLanguageCode()).pipe(
      map((language: { value: string }) => language.value),
      switchMap((language: string) =>
        dispatch(new ActionLanguageSet(language))
      ),
      catchError((error: Error) => of(patchState({ error })))
    );
  }

  @Action(ActionLanguageSet)
  languageSet(
    { patchState }: StateContext<StateLanguageModel>,
    { payload }: ActionLanguageSet
  ) {
    const language: string = payload;

    if (language != null) {
      this.translate.use(language);

      patchState({ language });
    }
  }
}
