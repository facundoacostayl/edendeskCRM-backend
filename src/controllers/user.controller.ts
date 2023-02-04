import { Request, Response } from "express";
import { User } from "../config/entities/User";
import { Operation } from "../config/entities/Operation";
import { getUser, createUser, loginUser, updateUser } from "../services/user.service";
import { errorHandler } from "../utils/error.handle";
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

export const getItem = async (req: Request, res: Response) => {
  try {

    //Require params
    const { userId } = req.params;

    //Data request
    const response = await getUser(parseInt(userId));

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throw new Error(response.message);
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    if (error instanceof Error) {
      errorHandler(res, error.message, 400);
    }
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
      throw new Error(response.message);
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    if (error instanceof Error) {
      errorHandler(res, error.message, 400);
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
      throw new Error(response.message);
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    if (error instanceof Error) {
      errorHandler(res, error.message, 400)
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
      throw new Error(response.message);
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    error instanceof Error && res.status(500).json(error.message);
  }
};

export const authorizeToken = (req: Request, res: Response) => {
  try {
    res.json(true);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
  }
};
