export enum GlobalVariable
{
    UserAdmin = 'baLysAd71cRyZjh0hr6poxR8an13',

    DistanceThreshold  = 200,
    DistanceScorePower = 4,

    EventRecentlyAddedWeight = 0.5,
    EventPopularityWeight    = 0.1,
    EventUpcomingWeight      = 0.4,

    EventRecentlyAddedMin = 0.1,
    EventPopularityMin    = 0.3,
    EventUpcomingMin      = 0.1,

    EventRecentlyAddedSegmentMillis = 604800000, // 1 Week
    EventPopularityMultiplier       = 3,
    EventUpcomingSegmentMillis      = 604800000, // 1 Week

    InterestScoreWeightRaw         = 0.2,
    InterestScoreWeightSubscribers = 0.8
}
