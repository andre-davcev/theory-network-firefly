import { runWith, EventContext } from 'firebase-functions';

const UserAlertsCreate =

runWith( { memory: '2GB' }).
pubsub.
schedule('0 9 * * *').
onRun(async (context: EventContext) =>
{
    console.log('IMPLEMENT');
});

export { UserAlertsCreate };
