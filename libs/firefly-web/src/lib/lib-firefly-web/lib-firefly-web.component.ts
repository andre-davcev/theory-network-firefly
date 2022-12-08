import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fi-lib-firefly-web',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lib-firefly-web.component.html',
  styleUrls: ['./lib-firefly-web.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibFireflyWebComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
