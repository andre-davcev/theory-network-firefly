import { FirebaseConfig } from '../interfaces';

export const FIREBASE_CONFIG: FirebaseConfig = JSON.parse(
  process.env.FIREBASE_CONFIG
);
