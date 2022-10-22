"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceStreams = void 0;
const enums_1 = require("../enums");
class ServiceStreams {
    /**
     * ((t - d)/t)^4
     *
     * @param distance
     */
    static scoreCityDistance(distance) {
        return distance >= enums_1.GlobalVariable.DistanceThreshold ?
            0 :
            Math.pow((enums_1.GlobalVariable.DistanceThreshold - distance) / enums_1.GlobalVariable.DistanceThreshold, enums_1.GlobalVariable.DistanceScorePower);
    }
    static scoreEvent(event, nowInMillis) {
        const timeNotify = event.timeNotify.toDate().getTime();
        const timeStart = event.timeStart.toDate().getTime();
        if (event.notifyComplete || timeNotify <= nowInMillis || timeStart <= nowInMillis) {
            return enums_1.GlobalVariable.EventUpcomingMin;
        }
        return (ServiceStreams.scoreEventRecentlyAdded(event, nowInMillis) * enums_1.GlobalVariable.EventRecentlyAddedWeight) +
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
    static scoreEventRecentlyAdded(event, nowInMillis) {
        const dateCreated = event.dateCreated.toDate().getTime();
        const millisDiff = nowInMillis - dateCreated;
        const segments = Math.floor(millisDiff / enums_1.GlobalVariable.EventRecentlyAddedSegmentMillis);
        return segments > 8 ?
            enums_1.GlobalVariable.EventRecentlyAddedMin :
            (10 - segments) * 0.1;
    }
    static scoreEventPopularity(event) {
        const interestCount = event.interests.length;
        const segments = Math.floor(interestCount / enums_1.GlobalVariable.EventPopularityMultiplier) + 1;
        return event.private || segments === 1 ?
            enums_1.GlobalVariable.EventPopularityMin :
            segments * 0.1;
    }
    /*
      Event Score (10)
          - Event Is Upcoming Score (notifyComplete, timeNotify, timeStart)
    */
    static scoreEventUpcoming(event, nowInMillis) {
        const timeStart = event.timeStart.toDate().getTime();
        const millisDiff = timeStart - nowInMillis;
        const segments = Math.floor(millisDiff / enums_1.GlobalVariable.EventRecentlyAddedSegmentMillis);
        return event.notifyComplete ?
            enums_1.GlobalVariable.EventUpcomingMin :
            (10 - segments) * 0.1;
    }
}
exports.ServiceStreams = ServiceStreams;
//# sourceMappingURL=stream.service.js.map