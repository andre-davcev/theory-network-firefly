import {
  Component,
  HostBinding,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'ff-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentLogo {
  @HostBinding('class.cpt-loading')
  @Input()
  public loading: boolean = false;

  @Input()
  public tagline: boolean = false;
}
