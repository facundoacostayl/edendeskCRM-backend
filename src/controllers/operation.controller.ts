import { Response, Request } from "express";
import {
  getFullOperationData,
  getTodayOperationData,
  getMonthOperationData,
  getSumOfAllBalances,
} from "../services/operation.service";
import { ErrorWithStatus, throwErrorWithStatus } from "../utils/error.handle";
import { httpStatusCodes } from "../utils/httpStatusCodes";

export const getFullItemData = async (req: Request, res: Response) => {
  try {
    //Require params
    const { userId } = req.params;

    //Data request
    const response = await getFullOperationData(parseInt(userId));

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throwErrorWithStatus(response);
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    error instanceof ErrorWithStatus &&
      res.status(error.statusCode).json(error.message);
  }
};

export const getTodayItemData = async (req: Request, res: Response) => {
  try {
    //Require params
    const { userId } = req.params;

    //Data request
    const response = await getTodayOperationData(parseInt(userId));

    //Checking if data exists and returning success response
    if (response) {
      return res.status(response.statusCode).json(response);
    }
  } catch (error) {
    error instanceof Error &&
      res.status(httpStatusCodes.INTERNAL_SERVER).send("Server internal error");
  }
};

export const getMonthItemData = async (req: Request, res: Response) => {
  try {
    //Require params
    const { userId } = req.params;

    //Require body
    const { creationMonth, creationYear } = req.params;

    //Data request
    const response = await getMonthOperationData(
      parseInt(userId),
      parseInt(creationMonth),
      parseInt(creationYear)
    );

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throwErrorWithStatus(response);
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    error instanceof ErrorWithStatus &&
      res.status(error.statusCode).send(error.message);
  }
};

export const getFullItemBalance = async (req: Request, res: Response) => {
  try {
    //Require params
    const { userId } = req.params;

    //Data request
    const response = await getSumOfAllBalances(parseInt(userId));

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throwErrorWithStatus(response);
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    error instanceof ErrorWithStatus &&
      res.status(error.statusCode).json(error.message);
  }
};
