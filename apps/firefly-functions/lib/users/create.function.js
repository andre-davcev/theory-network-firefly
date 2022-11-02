"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersCreate = void 0;
const firebase_functions_1 = require("firebase-functions");
const firebase_admin_1 = require("firebase-admin");
const firestore_1 = require("@angular/fire/firestore");
const library_1 = require("../library");
const database = (0, firebase_admin_1.firestore)();
const UsersCreate = firebase_functions_1.firestore.
    document(`${library_1.Collection.Users}/{id}`).
    onCreate(async (snapshot, context) => {
    const userId = snapshot.id;
    const user = library_1.ServiceFirestore.create(snapshot, library_1.Version.Users);
    user.isPublisher = false;
    user.subscriptionsStatus = {};
    user.notifications =
        {
            default: {
                read: false,
                timeStart: firestore_1.Timestamp.fromDate(new Date('1776-07-04'))
            }
        };
    const userProfile = {
        userId,
        nameFirst: '',
        nameLast: '',
        icon: '',
        companyName: '',
        isCompany: false
    };
    return Promise.all([
        snapshot.ref.update({ data: user }),
        database.collection(library_1.Collection.UserProfiles).doc(userId).create(userProfile),
        library_1.ServiceCities.createIfNew(database, user)
    ]);
});
exports.UsersCreate = UsersCreate;
//# sourceMappingURL=create.function.js.map