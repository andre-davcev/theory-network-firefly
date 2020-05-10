import { StateSearchModel } from "./search.state.model";
import { StateSearchOptions } from './search.state.options';
import { Injectable } from '@angular/core';
import { State, Store, StateContext, Action, Selector } from '@ngxs/store';
import { ActionSearchAll } from './search.actions';
import algoliaSearch, { SearchIndex } from 'algoliasearch/lite';
import { of, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@State<StateSearchModel>(StateSearchOptions)
@Injectable()
export class StateSearch
{
  @Selector() static searchResults(state: StateSearchModel) : Array<Object>  { return state.searchResults; }
  @Selector() static searchResultsFound(state: StateSearchModel) : boolean { return state.searchResults.length > 0 }

  public searchClient = algoliaSearch('8NDQ1FNIDU','45b11751dc7e276f781a85f719abda66');
  public index: SearchIndex = this.searchClient.initIndex('interests');

  constructor
  (
    private store : Store
  ){}

  @Action(ActionSearchAll)
  searchAll({ patchState }: StateContext<StateSearchModel>, { searchString } : ActionSearchAll)
  {
        let hits = [];
        console.log('search: ' + searchString);

        if(searchString.length<3)
        {
          return of(patchState({ searchResults : []}))
        }
        //const result = await this.index.search(searchString);
        return from(this.index.search(searchString)).pipe
        (
          tap((result) => {
            console.log('returned');

            hits = result.hits;
            console.log(hits);
            patchState({ searchResults : hits});
            console.log(hits);
          })
        )
        //hits = result.hits;
        //console.log(hits);
  }
}
