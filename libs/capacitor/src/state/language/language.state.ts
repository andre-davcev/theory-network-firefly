import { State, Selector, Action, StateContext } from '@ngxs/store';
import { of, from } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Device } from '@capacitor/device';
import { Injectable } from '@angular/core';

import { StateLanguageModel } from './language.state.model';
import { StateLanguageOptions } from './language.state.options';
import {
  ActionLanguageInitialize,
  ActionLanguageGet,
  ActionLanguageSet
} from './language.actions';

@State<StateLanguageModel>(StateLanguageOptions)
@Injectable()
export class StateLanguage {
  constructor(private translate: TranslateService) {}

  @Selector() static language(state: StateLanguageModel): string {
    return state.language;
  }

  @Selector() static error(state: StateLanguageModel): any {
    return state.error;
  }

  @Selector() static errored(state: StateLanguageModel): boolean {
    return state.error != null;
  }

  @Selector() static languageIso639_1(state: StateLanguageModel): string {
    const language: string = StateLanguage.language(state);

    return language == null || language.length === 0
      ? undefined
      : language.split('-')[0].toLowerCase();
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
