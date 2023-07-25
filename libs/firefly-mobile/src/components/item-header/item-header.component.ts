import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'ff-item-header',
  templateUrl: './item-header.component.html',
  styleUrls: ['./item-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentItemHeader {
  @Input() form!: UntypedFormGroup;

  @Input() iconUrl!: string;
  @Input() iconUrlEmpty!: string;
  @Input() iconPlaceholder!: string;

  @Input() title!: string;
  @Input() titlePlaceholder!: string;

  @Input() subtitle!: string;
  @Input() subtitlePlaceholder!: string;

  @Input() iconOnly!: boolean;

  @Output() iconClicked: EventEmitter<void> = new EventEmitter();

  constructor() {}

  public clickedIcon(): void {
    this.iconClicked.next();
  }

  public get edit(): boolean {
    return this.form != null;
  }

  public get url(): string {
    return this.edit
      ? this.iconUrl == null
        ? this.iconUrlEmpty
        : this.iconUrl
      : this.iconUrl;
  }

  public hasError(name: string): boolean {
    const control: AbstractControl | null = this.form.get(name);

    return (control?.invalid || false) && (control?.dirty || control?.touched);
  }
}
