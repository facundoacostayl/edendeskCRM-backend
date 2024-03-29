import { Request, Response } from "express";
import {
  getUser,
  createUser,
  loginUser,
  updateUser,
} from "../services/user.service";
import { ErrorWithStatus, throwErrorWithStatus } from "../utils/error.handle";

export const getItem = async (req: Request, res: Response) => {
  try {
    //Require params
    const { userId } = req.params;

    //Data request
    const response = await getUser(parseInt(userId));

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throwErrorWithStatus(response);
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    error instanceof ErrorWithStatus &&
      res.status(error.statusCode).json({ message: error.message });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    //Require body
    const { firstName, loginEmail, password } = req.body;

    //Data request
    const response = await createUser(firstName, loginEmail, password);

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throwErrorWithStatus(response);
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    if (error instanceof Error) {
      error instanceof ErrorWithStatus &&
        res.status(error.statusCode).json({ message: error.message });
    }
  }
};

export const loginItem = async (req: Request, res: Response) => {
  try {
    //Require body
    const { loginEmail, password } = req.body;

    //Data request
    const response = await loginUser(loginEmail, password);

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throwErrorWithStatus(response);
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    if (error instanceof Error) {
      error instanceof ErrorWithStatus &&
        res.status(error.statusCode).json({ message: error.message });
    }
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    //Require params and body
    const { userId } = req.params;
    const { body } = req;

    //Data request
    const response = await updateUser(parseInt(userId), body);

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throwErrorWithStatus(response);
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    error instanceof ErrorWithStatus &&
      res.status(error.statusCode).json({ message: error.message });
  }
};

export const authorizeToken = (req: Request, res: Response) => {
  try {
    res.json(true);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
