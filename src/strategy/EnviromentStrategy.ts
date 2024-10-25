import { StrategyError } from '@codismart/architect-toolkit';
import { type IEnvironment, type EnvironmentType, LocalEnvironment, RemoteEnvironment } from 'src/enviroment';

export class EnvironmentStrategy {
  readonly #strategy: Map<EnvironmentType, IEnvironment>;

  constructor() {
    this.#strategy = new Map();
    this.#strategy.set('local', new LocalEnvironment());
    this.#strategy.set('develop', new RemoteEnvironment());
    this.#strategy.set('qa', new RemoteEnvironment());
    this.#strategy.set('beta', new RemoteEnvironment());
    this.#strategy.set('production', new RemoteEnvironment());
  }

  get(environment: EnvironmentType): IEnvironment {
    const strategy = this.#strategy.get(environment);
    if (strategy === undefined) throw new StrategyError('EnvironmentStrategy', environment);
    return strategy;
  }
}
