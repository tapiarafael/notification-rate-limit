export class BaseError extends Error {
  name: string;
  code: number;

  constructor(message: string, code?: number) {
    super(message);
    this.name = this.constructor.name;
    this.code = code || 500;
  }
}
