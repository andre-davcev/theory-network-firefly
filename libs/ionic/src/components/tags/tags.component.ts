import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnInit,
  Output
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Tag, TagEvent } from './models';

@Component({
  selector: 'tn-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsComponent implements OnInit {
  @Input()
  public edit: boolean = false;

  @Input()
  public outline: boolean = false;

  @Input()
  public closeIcon: string = 'close-circle';

  @Input()
  public tags: Array<Tag> = [];

  @Output()
  public close: EventEmitter<TagEvent> = new EventEmitter();

  @Output()
  public click: EventEmitter<TagEvent> = new EventEmitter();

  private closeClick: boolean = false;

  public ngOnInit(): void {
    const tagColors: Array<string> = ['primary', 'secondary', 'tertiary'];
    const tagColorCount: number = tagColors.length;
    let i: number = 0;

    // Assign colors unless defined
    this.tags.map((tag: Tag) => {
      const colorDefined: boolean = tag.color != null;

      tag.disabled = tag.disabled || false;

      if (!colorDefined) {
        tag.color = tagColors[i];
        i++;

        if (i === tagColorCount) {
          i = 0;
        }
      }

      return tag;
    });
  }

  public closeClicked(index: number, tag: Tag): void {
    this.closeClick = true;

    this.close.emit({ index, tag });
  }

  public chipClicked(index: number, tag: Tag): void {
    if (!this.closeClick) {
      this.click.emit({ index, tag });
    } else {
      this.closeClick = false;
    }
  }
}

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [TagsComponent],
  exports: [TagsComponent]
})
export class TagsComponentModule {}
