import { ResponseType } from "../interfaces/response.interface";

class ErrorWithStatus extends Error {
  private status = 0;

  get statusCode(): number {
    return this.status;
  }

  set statusCode(code: number) {
    this.status = code;
  }
}

const throwErrorWithStatus = (response: ResponseType) => {
  const error = new ErrorWithStatus(response.message);
  error.statusCode = response.statusCode;

  throw error;
};

export { ErrorWithStatus, throwErrorWithStatus };
