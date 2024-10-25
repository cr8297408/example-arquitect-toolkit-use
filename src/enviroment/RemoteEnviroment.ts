import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import { ValidationSystemError } from '@codismart/architect-toolkit'
import { LoggerInstance } from 'src/utils';
import {
  type IEnvConfig,
  type IEnvironment,
  type IEnvironmentDependency,
  type ServiceApplicationApi,
  type Database,
} from './IEnviroment';
import { EnvironmentError } from '../errors';

type SecretsValuesParameters = ServiceApplicationApi & Database;

export class RemoteEnvironment implements IEnvironment {
  readonly #env: NodeJS.ProcessEnv = process.env;

  async setup({ ENVIRONMENT }: IEnvironmentDependency): Promise<IEnvConfig> {
    if (ENVIRONMENT === undefined) throw new EnvironmentError('NODE_ENV');

    const REGION_AWS = this.#env.REGION_AWS;
    const SECRET_NAME_AWS = this.#env.SECRET_NAME_AWS;

    if (REGION_AWS === undefined) throw new EnvironmentError('REGION_AWS');
    if (SECRET_NAME_AWS === undefined)
      throw new EnvironmentError('SECRET_NAME_AWS');

    let secretValue: SecretsValuesParameters = {
      TRANSACTION_DB_HOST: '',
      TRANSACTION_DB_USER: '',
      TRANSACTION_DB_PASSWORD: '',
      TRANSACTION_DB_NAME: '',
      TRANSACTION_DB_PORT: '',
      API_PORT: '',
    };

    try {
      const client = new SecretsManagerClient({ region: REGION_AWS });
      const command = new GetSecretValueCommand({
        SecretId: SECRET_NAME_AWS,
        VersionStage: 'AWSCURRENT',
      });
      const response = await client.send(command);

      if (response.SecretString !== undefined) {
        secretValue = JSON.parse(response.SecretString);
      }
    } catch (error) {
      LoggerInstance.warn(
        `Error->EnvConfig->GetSecrets->${JSON.stringify(error)}`
      );
      throw new ValidationSystemError('Error Get Secrets remote');
    }

    if (secretValue.API_PORT === undefined || secretValue.API_PORT === '')
      throw new EnvironmentError('.API_PORT');
    if (
      secretValue.TRANSACTION_DB_HOST === undefined ||
      secretValue.TRANSACTION_DB_HOST === ''
    )
      throw new EnvironmentError('.TRANSACTION_DB_HOST');

    if (secretValue.TRANSACTION_DB_USER === undefined)
      throw new EnvironmentError('.TRANSACTION_DB_USER');

    if (secretValue.TRANSACTION_DB_PASSWORD === undefined)
      throw new EnvironmentError('.TRANSACTION_DB_PASSWORD');

    if (secretValue.TRANSACTION_DB_NAME === undefined)
      throw new EnvironmentError('.TRANSACTION_DB_NAME');

    if (secretValue.TRANSACTION_DB_PORT === undefined)
      throw new EnvironmentError('.TRANSACTION_DB_PORT');

    return {
      ENVIRONMENT,
      ...secretValue,
    };
  }
}
