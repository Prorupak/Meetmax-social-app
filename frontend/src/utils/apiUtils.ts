export class ResponseError extends Error {
  status: number;
  body: unknown;
  constructor(target: string, status: number, body: unknown) {
    super(`Request to ${target} failed with status ${status}`);
    this.status = status;
    this.body = body;
  }
}
