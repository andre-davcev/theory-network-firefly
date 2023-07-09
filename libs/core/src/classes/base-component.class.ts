import { OnDestroy, HostListener, Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: ''
})
export abstract class BaseComponent implements OnDestroy {
  public destroy$: Subject<boolean> = new Subject<boolean>();

  @HostListener('window:beforeunload')
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
