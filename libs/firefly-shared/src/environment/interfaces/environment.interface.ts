import { EnvironmentApis } from './environment-apis.interface';

export interface Environment {
  production: boolean;
  environment: string;
  language: string;
  pathJson: string;
  apis: EnvironmentApis;
}
