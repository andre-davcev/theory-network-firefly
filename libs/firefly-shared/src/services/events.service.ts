import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { DateEvents, Event } from '@firefly/cloud';
import { DateUtil, Regex, ValidatorsExtended } from '@theory/core';
import { ServiceFirestore } from '@theory/firebase';

@Injectable({ providedIn: 'root' })
export class ServiceEvents extends ServiceFirestore<Event> {
  constructor(firestore: AngularFirestore, formBuilder: UntypedFormBuilder) {
    super(firestore, formBuilder);
  }

  private static validateEndTime(): ValidatorFn {
    const validator: ValidatorFn = (
      control: AbstractControl
    ): { timeEndInvalid: true } | null => {
      const form: UntypedFormGroup = control.parent as UntypedFormGroup;

      let valid: boolean = false;

      if (form != null) {
        const start: Timestamp | undefined = form.get('timeStart')?.value;
        const end: Timestamp | undefined = form.get('timeEnd')?.value;

        if (start != null && end != null) {
          const timeStart: Date = start.toDate();
          const timeEnd: Date = end.toDate();

          valid = timeEnd.getTime() > timeStart.getTime();
        }
      }

      return valid ? null : { timeEndInvalid: true };
    };

    return validator;
  }

  private static validateTimeNotify(): ValidatorFn {
    const validator: ValidatorFn = (
      control: AbstractControl
    ): { timeNotifyInvalid: true } | null => {
      const value: Timestamp = control.value;

      let valid: boolean = false;

      if (value != null) {
        const timeNotify: Date = value.toDate();
        const threshold: Date = DateUtil.atHourNext(new Date(), 2);

        valid = timeNotify.getTime() >= threshold.getTime();
      }

      return valid ? null : { timeNotifyInvalid: true };
    };

    return validator;
  }

  private static validateTimeStart(): ValidatorFn {
    const validator: ValidatorFn = (
      control: AbstractControl
    ): { timeStartInvalid: true } | null => {
      const value: Timestamp = control.value;

      let valid: boolean = false;

      if (value != null) {
        const timeStart: Date = value.toDate();
        const now: Date = DateUtil.now();

        valid = timeStart.getTime() > now.getTime();
      }

      return valid ? null : { timeStartInvalid: true };
    };

    return validator;
  }

  public static eventsList(events: Array<Event>): Array<DateEvents> {
    const eventsList: Array<DateEvents> = [];

    let current: DateEvents;
    let timeStart: Date;
    let timeStartPrevious: Date;
    let datesAreEqual: boolean = true;

    events.forEach((event: Event) => {
      timeStart = event.timeStart.toDate();

      datesAreEqual =
        timeStartPrevious != null &&
        timeStart.getFullYear() === timeStartPrevious.getFullYear() &&
        timeStart.getMonth() === timeStartPrevious.getMonth() &&
        timeStart.getDate() === timeStartPrevious.getDate();

      if (!datesAreEqual) {
        if (timeStartPrevious != null) {
          eventsList.push(current);
        }

        current = {
          date: event.timeStart,
          events: []
        };
      }

      current.events.push(event);

      timeStartPrevious = timeStart;
    });

    if (eventsList.length === 0 && events.length > 0) {
      current = {
        date: events[0].timeStart,
        events
      };

      if (current != null) {
        eventsList.push(current);
      }
    }

    return eventsList;
  }

  public override formDataNew(userId: string, defaults: Event): Event {
    const event: Event = {
      ...super.formDataNew(userId, defaults),

      timeStart: Timestamp.fromDate(DateUtil.atHourNext()),
      timeEnd: Timestamp.fromDate(DateUtil.atHourNext(new Date(), 2)),
      timeNotify: Timestamp.fromDate(DateUtil.atHourNext(new Date(), 2))
    };

    return event;
  }

  public override formCreate(event: Event): UntypedFormGroup {
    //temporary
    if (!event.metadata) {
      event.metadata = {
        icon: '',
        image: ''
      };
    }

    return super.formCreate({
      ...event,

      description: [
        event.description,
        [Validators.required, ValidatorsExtended.minLength(1)]
      ],
      geopoint: [event.geopoint, [Validators.required]],
      interests: [event.interests, []],
      name: [
        event.name,
        [Validators.required, ValidatorsExtended.minLength(1)]
      ],
      tagline: [
        event.tagline,
        [Validators.required, ValidatorsExtended.minLength(1)]
      ],
      timeStart: [event.timeStart, [ServiceEvents.validateTimeStart()]],
      timeEnd: [event.timeEnd, [ServiceEvents.validateEndTime()]],
      timeNotify: [event.timeNotify, [ServiceEvents.validateTimeNotify()]],
      phone: [event.phone, [Validators.pattern(Regex.Numbers)]],
      website: [event.website, [Validators.pattern(Regex.WebsiteSecure)]],

      metadata: this.formBuilder.group({
        icon: [event.metadata.icon, []],
        image: [event.metadata.image, [Validators.required]],
        place: [event.metadata.place, []]
      })
    });
  }
}
