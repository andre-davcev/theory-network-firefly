import { InjectionToken } from '@angular/core';
import { EnvironmentFirebase } from '@theory/firebase';

export const FirebaseEnvironment = new InjectionToken<EnvironmentFirebase>(
  'FirebaseEnvironment'
);
