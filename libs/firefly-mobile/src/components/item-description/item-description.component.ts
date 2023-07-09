import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'ff-item-description',
  templateUrl: './item-description.component.html',
  styleUrls: ['./item-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentItemDescription {
  @Input() form: UntypedFormGroup;

  @Input() title: string;

  @Input() description: string;
  @Input() descriptionPlaceholder: string;

  constructor() {}

  public get edit(): boolean {
    return this.form != null;
  }
}
