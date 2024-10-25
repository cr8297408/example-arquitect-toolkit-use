import { ConfigService } from '@nestjs/config';
import { type EnvironmentType, type IEnvConfig } from './IEnviroment';
import { EnvironmentStrategy } from '../strategy';

export class Environment {
  async getConfig(): Promise<IEnvConfig> {
    const configService = new ConfigService();
    const ENVIRONMENT =
      configService.get('ENVIRONMENT') ?? ('local' as EnvironmentType);
    const strategy = new EnvironmentStrategy();
    const secrets = await strategy.get(ENVIRONMENT).setup({ ENVIRONMENT });

    return secrets;
  }
}

const EnvironmentInstance = new Environment();
export { EnvironmentInstance };
