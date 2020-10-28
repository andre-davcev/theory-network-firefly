import { OnDestroy, HostListener, Directive } from '@angular/core';

// libs
import { Subject } from 'rxjs';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  public destroy$: Subject<any> = new Subject();

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
