import { Input, Output, EventEmitter } from '@angular/core';

import { BaseComponent } from '@theory/core';

export abstract class HeaderBaseComponent extends BaseComponent {
  @Input() title: string;
  @Input() rightButton: string;
  @Output() tappedRight: EventEmitter<boolean> = new EventEmitter();
}
