import { KindError, SystemError } from '@codismart/architect-toolkit';

export class NotFoundError extends SystemError {
  constructor(key: string, value: string) {
    super(`No se encontrar: ${key} con el valor ${value}`);
    this.code = 'service/not-found';
    this.name = 'NotFoundError';
    this.kind = KindError.SYSTEM;
    this.details = {
      message: `No se encontrar: ${key} con el valor ${value}`,
    };
  }
}
