export type EnvironmentType =
  | 'local'
  | 'develop'
  | 'qa'
  | 'beta'
  | 'production';

export interface ServiceApplicationApi {
  API_PORT: string;
}

export interface Database {
  TRANSACTION_DB_USER: string;
  TRANSACTION_DB_HOST: string;
  TRANSACTION_DB_PASSWORD: string;
  TRANSACTION_DB_NAME: string;
  TRANSACTION_DB_PORT: string;
}

export interface IEnvConfig extends ServiceApplicationApi, Database {
  ENVIRONMENT: EnvironmentType;
}

export interface IEnvironmentDependency {
  ENVIRONMENT: EnvironmentType;
}

export interface IEnvironment {
  setup: (dependencies: IEnvironmentDependency) => Promise<IEnvConfig>;
}
