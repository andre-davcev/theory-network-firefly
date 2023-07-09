import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { StateLanguage } from '@theory/capacitor';
import * as moment from 'moment';
import { Timestamp } from '@angular/fire/firestore';

import { TimestampFormat } from './timestamp-format.enum';

@Pipe({ name: 'timestamp', pure: false })
export class PipeTimestamp implements PipeTransform {
  constructor(private store: Store) {
    this.store
      .select(StateLanguage.language)
      .subscribe((language: string) => moment.locale(language));
  }

  public transform(
    value: Timestamp,
    name: TimestampFormat = TimestampFormat.MediumDate,
    timezone: string = 'GMT'
  ): string {
    if (value == null) {
      return '';
    }

    const date: Date = value.toDate();

    if (name === TimestampFormat.ShortTime) {
      return moment(date).format('LT');
    } else if (name === TimestampFormat.MediumDate) {
      return moment(date).format('MMM d, y');
    } else if (name === TimestampFormat.Short) {
      return moment(date).format('M/d/yy, h:mm a');
    } else if (name === TimestampFormat.DateShort) {
      return moment(date).format('llll');
    } else if (name === TimestampFormat.DateLong) {
      return moment(date).format('LLLL');
    } else if (name === TimestampFormat.IsoString) {
      return moment(date).format();
    }

    return '';
  }
}
