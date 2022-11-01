
import { runWith, EventContext } from 'firebase-functions';
import { auth } from 'firebase-admin';
import * as moment from 'moment';

const UsersCron =

runWith({ memory: '2GB', timeoutSeconds: 540 }).
pubsub.
schedule('0 3 * * *'). // Every Day @ 3AM
onRun(async (context: EventContext) =>
{
    let chunk: number;

    const authenticated: auth.Auth = auth();

    const list: auth.ListUsersResult = await authenticated.listUsers(1000);

    const chunks: Array<Array<string>> = list.users.
        filter((user: auth.UserRecord) =>
            user.providerData.length === 0 &&         // A user is anonymous if there is no providerData
            !user.emailVerified &&                    //   and doesn't have a verified email
            moment(user.metadata.lastSignInTime).     //   and last sign in is older than 7 days
                isBefore(moment().subtract(7, 'days')
            )
        ).
        map((user: auth.UserRecord) =>
            user.uid
        ).
        reduce((chunks: Array<Array<string>>, uid: string, i: number) => {
            chunk = Math.floor(i/10);

            chunks[chunk] = [
              ...(chunks[chunk] || []),
              uid
            ];

            return chunks
        }, []).
        slice(0, 10);

        chunks.
        forEach(async (chunk: Array<string>) => {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const deletions: Array<Promise<void>> =
                chunk.map((uid: string) =>
                    authenticated.deleteUser(uid)
                )

            await Promise.all(deletions);
        });
});

export { UsersCron };
