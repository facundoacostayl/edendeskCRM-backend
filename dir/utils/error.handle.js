"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwErrorWithStatus = exports.ErrorWithStatus = void 0;
//Class created in order to extend the class "Error" and add new properties as statusCode as in this case
class ErrorWithStatus extends Error {
    constructor() {
        super(...arguments);
        this.status = 0;
    }
    get statusCode() {
        return this.status;
    }
    set statusCode(code) {
        this.status = code;
    }
}
exports.ErrorWithStatus = ErrorWithStatus;
//Function for throwing a new ErrorWithStatus
const throwErrorWithStatus = (response) => {
    const error = new ErrorWithStatus(response.message);
    error.statusCode = response.statusCode;
    throw error;
};
exports.throwErrorWithStatus = throwErrorWithStatus;
