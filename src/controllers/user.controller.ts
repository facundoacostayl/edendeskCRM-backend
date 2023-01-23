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
    const { id } = req.params;

    //Data request
    const response = await getUser(parseInt(id));

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throw new Error(response.message);
    }

    return res.json(response.data);
  } catch (error) {
    if (error instanceof Error) {
      errorHandler(res, error.message, 400);
    }
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    //Require body
    const { firstname, loginemail, password } = req.body;

    //Data request
    const response = await createUser(firstname, loginemail, password);

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throw new Error(response.message);
    }

    return res.json(response);
  } catch (error) {
    if (error instanceof Error) {
      errorHandler(res, error.message, 400);
    }
  }
};

export const loginItem = async (req: Request, res: Response) => {
  try {
    //Require body
    const { loginemail, password } = req.body;

    //Data request
    const response = await loginUser(loginemail, password);

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throw new Error(response.message);
    }

    res.json(response.data);
  } catch (error) {
    if (error instanceof Error) {
      errorHandler(res, error.message, 400)
    }
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {

    //Require params and body
    const { id } = req.params;
    const { body } = req;

    //Data request
    const response = await updateUser(parseInt(id), body);

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throw new Error(response.message);
    }

    return res.json(response);
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
