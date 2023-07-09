import { Timestamp } from 'firebase/firestore';

import { GlobalVariable } from '../enums';
import { Event } from '../../shared';

export class ServiceStreams {
  /**
   * ((t - d)/t)^4
   *
   * @param distance
   */
  public static scoreCityDistance(distance: number): number {
    return distance >= GlobalVariable.DistanceThreshold
      ? 0
      : Math.pow(
          (GlobalVariable.DistanceThreshold - distance) /
            GlobalVariable.DistanceThreshold,
          GlobalVariable.DistanceScorePower
        );
  }

  public static scoreEvent(event: Event, nowInMillis: number): number {
    const timeNotify: number = event.timeNotify.toDate().getTime();
    const timeStart: number = event.timeStart.toDate().getTime();

    if (
      event.notifyComplete ||
      timeNotify <= nowInMillis ||
      timeStart <= nowInMillis
    ) {
      return GlobalVariable.EventUpcomingMin;
    }

    return (
      ServiceStreams.scoreEventRecentlyAdded(event, nowInMillis) *
        GlobalVariable.EventRecentlyAddedWeight +
      ServiceStreams.scoreEventPopularity(event) +
      ServiceStreams.scoreEventUpcoming(event, nowInMillis)
    );
  }

  /**
   * Weight: Weeks from todays date
   * Range:  0 - 8+
   * Score:  1 - 0.1
   * Period: 1 Week
   *
   * @param event
   * @param nowInMillis
   */
  public static scoreEventRecentlyAdded(
    event: Event,
    nowInMillis: number
  ): number {
    const dateCreated: number = (event.dateCreated as Timestamp)
      .toDate()
      .getTime();
    const millisDiff: number = nowInMillis - dateCreated;

    const segments: number = Math.floor(
      millisDiff / GlobalVariable.EventRecentlyAddedSegmentMillis
    );

    return segments > 8
      ? GlobalVariable.EventRecentlyAddedMin
      : (10 - segments) * 0.1;
  }

  public static scoreEventPopularity(event: Event): number {
    const interestCount: number = event.interests.length;
    const segments: number =
      Math.floor(interestCount / GlobalVariable.EventPopularityMultiplier) + 1;

    return event.private || segments === 1
      ? GlobalVariable.EventPopularityMin
      : segments * 0.1;
  }

  /*
      Event Score (10)
          - Event Is Upcoming Score (notifyComplete, timeNotify, timeStart)
    */
  public static scoreEventUpcoming(event: Event, nowInMillis: number): number {
    const timeStart: number = event.timeStart.toDate().getTime();

    const millisDiff: number = timeStart - nowInMillis;
    const segments: number = Math.floor(
      millisDiff / GlobalVariable.EventRecentlyAddedSegmentMillis
    );

    return event.notifyComplete
      ? GlobalVariable.EventUpcomingMin
      : (10 - segments) * 0.1;
  }
}
