import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'tn-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentParagraph implements OnInit {
  @Input() public text: string = '';

  @HostBinding('class.cpt-first-letter')
  @Input()
  public firstLetter: boolean = false;

  public firstWord: string = '';
  public paragraph: string = '';

  public ngOnInit(): void {
    const text: string = this.text;

    let index: number = text.indexOf(' ');

    if (index === -1) {
      index = text.length;
    }

    this.firstWord = text.substring(0, index);
    this.paragraph = text.substring(index, text.length);
  }
}
