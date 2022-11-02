"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersCron = void 0;
const firebase_functions_1 = require("firebase-functions");
const firebase_admin_1 = require("firebase-admin");
const moment = require("moment");
const UsersCron = (0, firebase_functions_1.runWith)({ memory: '2GB', timeoutSeconds: 540 }).
    pubsub.
    schedule('0 3 * * *'). // Every Day @ 3AM
    onRun(async (context) => {
    let chunk;
    const authenticated = (0, firebase_admin_1.auth)();
    const list = await authenticated.listUsers(1000);
    const chunks = list.users.
        filter((user) => user.providerData.length === 0 && // A user is anonymous if there is no providerData
        !user.emailVerified && //   and doesn't have a verified email
        moment(user.metadata.lastSignInTime). //   and last sign in is older than 7 days
            isBefore(moment().subtract(7, 'days'))).
        map((user) => user.uid).
        reduce((chunks, uid, i) => {
        chunk = Math.floor(i / 10);
        chunks[chunk] = [
            ...(chunks[chunk] || []),
            uid
        ];
        return chunks;
    }, []).
        slice(0, 10);
    chunks.
        forEach(async (chunk) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const deletions = chunk.map((uid) => authenticated.deleteUser(uid));
        await Promise.all(deletions);
    });
});
exports.UsersCron = UsersCron;
//# sourceMappingURL=cron.function.js.map