import { StreamVariable } from '../enums';
import { Event } from '../documents';
import { firestore } from 'firebase-admin';

export class ServiceStreams
{
    /**
     * ((t - d)/t)^4
     *
     * @param distance
     */
    public static scoreCityDistance(distance: number): number
    {
        return distance >= StreamVariable.DistanceThreshold ?
            0 :
            Math.pow((StreamVariable.DistanceThreshold - distance) / StreamVariable.DistanceThreshold, StreamVariable.DistanceScorePower);
    }

    public static scoreEvent(event: Event, nowInMillis: number): number
    {
        const timeNotify: number = new Date(event.timeNotify).getMilliseconds();
        const timeStart:  number = new Date(event.timeStart).getMilliseconds();

        if (event.notifyComplete || timeNotify <= nowInMillis || timeStart <= nowInMillis) { return StreamVariable.EventUpcomingMin; }

        return (ServiceStreams.scoreEventRecentlyAdded(event, nowInMillis) * StreamVariable.EventRecentlyAddedWeight) +
            (ServiceStreams.scoreEventPopularity(event)) +
            (ServiceStreams.scoreEventUpcoming(event, nowInMillis));
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
    public static scoreEventRecentlyAdded(event: Event, nowInMillis: number): number
    {
        const dateCreated: number = (event.dateCreated as firestore.Timestamp).toDate().getMilliseconds();
        const millisDiff:  number = nowInMillis - dateCreated;

        const segments: number = Math.floor(millisDiff / StreamVariable.EventRecentlyAddedSegmentMillis);

        return segments > 8 ?
            StreamVariable.EventRecentlyAddedMin :
            (10 - segments) * 0.1;
    }

    public static scoreEventPopularity(event: Event): number
    {
        const clusterCount: number = event.clusters.length;
        const segments:     number = Math.floor(clusterCount / StreamVariable.EventPopularityMultiplier) + 1;

        return event.private || segments === 1 ?
            StreamVariable.EventPopularityMin :
            segments * 0.1;
    }

    /*
      Event Score (10)
          - Event Is Upcoming Score (notifyComplete, timeNotify, timeStart)
    */
    public static scoreEventUpcoming(event: Event, nowInMillis: number): number
    {
      const timeStart: number = new Date(event.timeStart).getMilliseconds();

      const millisDiff:  number = timeStart - nowInMillis;
      const segments: number = Math.floor(millisDiff / StreamVariable.EventRecentlyAddedSegmentMillis);

      return event.notifyComplete ?
          StreamVariable.EventUpcomingMin :
          (10 - segments) * 0.1;
    }
}
