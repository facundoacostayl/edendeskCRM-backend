import { ResponseType } from "../interfaces/response.interface";

//Class created in order to extend the class "Error" and add new properties as statusCode as in this case
class ErrorWithStatus extends Error {
  private status = 0;

  get statusCode(): number {
    return this.status;
  }

  set statusCode(code: number) {
    this.status = code;
  }
}

//Function for throwing a new ErrorWithStatus
const throwErrorWithStatus = (response: ResponseType) => {
  const error = new ErrorWithStatus(response.message);
  error.statusCode = response.statusCode;

  throw error;
};

export { ErrorWithStatus, throwErrorWithStatus };
