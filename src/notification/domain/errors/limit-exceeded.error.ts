import { BaseError } from './base.error';

export class LimitExceededError extends BaseError {
  constructor() {
    super('Limit of notifications exceeded', 429);
  }
}
