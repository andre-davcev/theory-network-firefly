import { OnDestroy, HostListener } from '@angular/core';

import { Subject } from 'rxjs';

export abstract class BaseComponent implements OnDestroy {
  public destroy$: Subject<any> = new Subject();

    @HostListener('window:beforeunload')
    public ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.complete();
    }
}
