import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'ff-item-image',
  templateUrl: './item-image.component.html',
  styleUrls: ['./item-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentItemImage {
  @Input() form!: UntypedFormGroup | null | undefined;
  @Input() edit: boolean = false;
  @Input() url!: string | null;
  @Input() placeholder!: string;
  @Input() title!: string;

  @Output() clicked: EventEmitter<void> = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) {}

  public clickedImage(): void {
    this.form?.markAsDirty();
    const control: AbstractControl | null | undefined = this.form?.get([
      'metadata',
      'image'
    ]);
    control?.markAsDirty();

    this.clicked.next();
  }

  public urlSafe(): SafeStyle {
    const url: string = this.url == null ? '' : this.url;

    return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }
}
