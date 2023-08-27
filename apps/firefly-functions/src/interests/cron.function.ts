import { firestore } from 'firebase-admin';
import { EventContext, runWith } from 'firebase-functions';

import { ServiceStreams } from '../library';

const InterestsCron = runWith({ memory: '2GB', timeoutSeconds: 540 })
  .pubsub.schedule('0 2 * * *') // Every Day At 2AM
  .onRun(async (context: EventContext) => {
    return ServiceStreams.streamsCreate(firestore());
  });

export { InterestsCron };
