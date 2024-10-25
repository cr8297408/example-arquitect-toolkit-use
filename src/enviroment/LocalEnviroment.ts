import { EnvironmentError } from '../errors';
import {
  type Database,
  type IEnvConfig,
  type IEnvironment,
  type IEnvironmentDependency,
  type ServiceApplicationApi,
} from './IEnviroment';

export class LocalEnvironment implements IEnvironment {
  readonly #env: NodeJS.ProcessEnv = process.env;

  async setup({ ENVIRONMENT }: IEnvironmentDependency): Promise<IEnvConfig> {
    if (ENVIRONMENT === undefined) throw new EnvironmentError('NODE_ENV');

    const serviceApplicationApi: ServiceApplicationApi = {
      API_PORT: '',
    };

    serviceApplicationApi.API_PORT = this.#env.API_PORT ?? '';
    if (serviceApplicationApi.API_PORT === '')
      throw new EnvironmentError('API_PORT');

    const Database: Database = {
      TRANSACTION_DB_HOST: '',
      TRANSACTION_DB_USER: '',
      TRANSACTION_DB_PASSWORD: '',
      TRANSACTION_DB_NAME: '',
      TRANSACTION_DB_PORT: '',
    };

    return {
      ENVIRONMENT,
      ...serviceApplicationApi,
      ...Database,
    };
  }
}
