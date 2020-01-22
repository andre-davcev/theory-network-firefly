

import { runWith, EventContext } from 'firebase-functions';

const EventsCron =

runWith( { memory: '2GB', timeoutSeconds: 540 }).
pubsub.
schedule('55 * * * *'). // Every hour @ 55 past the hour
onRun(async (context: EventContext) =>
{
/*
    cron hourly 55 mins past hour
    find hour past current time
    query events whose notifiedDateTime === generatedHourlyTimestamp
    for each interest id
        query users where interestId in user.subscriptions
        for each user
            create alert with alert.userId and with alert.tokens
    set event.timeNotifyComplete = true
*/
    return null;
});

export { EventsCron };
