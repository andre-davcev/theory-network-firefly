import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-page-event-library',
  templateUrl: 'event-library.page.html',
  styleUrls: ['./event-library.page.scss']
})
export class PageEventLibrary {
  public eventLibrary$: Observable<Array<string>> = of([]);

  public imageClicked(index: number): void {
    console.log(`event ${index} clicked`);
  }

  public doInfinite(infiniteScroll: any): void {
    /*
        this.store.dispatch(new ActionGridEventLibraryPage()).

        subscribe(() => infiniteScroll.target.complete());
*/
  }
}
