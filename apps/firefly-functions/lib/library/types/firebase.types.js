"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromDate = exports.serverTimestamp = exports.Timestamp = exports.GeoPoint = void 0;
const firebase_admin_1 = require("firebase-admin");
// import * as firebaseAuth from 'firebase/auth';
class GeoPoint extends firebase_admin_1.firestore.GeoPoint {
}
exports.GeoPoint = GeoPoint;
;
class Timestamp extends firebase_admin_1.firestore.Timestamp {
}
exports.Timestamp = Timestamp;
;
function serverTimestamp() { return firebase_admin_1.firestore.FieldValue.serverTimestamp(); }
exports.serverTimestamp = serverTimestamp;
function fromDate(date) { return firebase_admin_1.firestore.Timestamp.fromDate(date); }
exports.fromDate = fromDate;
//# sourceMappingURL=firebase.types.js.map