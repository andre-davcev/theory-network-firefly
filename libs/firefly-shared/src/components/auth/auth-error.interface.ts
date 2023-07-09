import { AuthControl } from './auth-control.enum';
import { AuthErrorId } from './auth-error-id.enum';
import { AuthErrorType } from './auth-error-type.enum';

export interface AuthError {
  control: AuthControl;
  id: AuthErrorId;
  message: string;
  type: AuthErrorType;
}
