import { OnDestroy, HostListener } from '@angular/core';

// libs
import { Subject } from 'rxjs';

export abstract class BaseComponent implements OnDestroy {
  public destroy$: Subject<any> = new Subject();

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
