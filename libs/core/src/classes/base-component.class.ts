import { OnDestroy, HostListener, Component } from '@angular/core';

import { Subject } from 'rxjs';

@Component
({
    template: ''
})
export abstract class BaseComponent implements OnDestroy {
  public destroy$: Subject<any> = new Subject();

    @HostListener('window:beforeunload')
    public ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.complete();
    }
}
