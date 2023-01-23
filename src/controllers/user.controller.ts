import { Request, Response } from "express";
import { User } from "../config/entities/User";
import { Operation } from "../config/entities/Operation";
import { getUser, createUser, loginUser, updateUser } from "../services/user.service";
import { errorHandler } from "../utils/error.handle";
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

export const getItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await getUser(parseInt(id));

    //Checking if there are errors
    if (data.type === "Error") {
      throw new Error(data.message);
    }

    return res.json(data.response);
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

    const data = await createUser(firstname, loginemail, password);

    //Checking if there are errors
    if (data.type === "Error") {
      throw new Error(data.message);
    }

    return res.json(data);
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

    const data = await loginUser(loginemail, password);

    //Checking if there are errors
    if (data.type === "Error") {
      throw new Error(data.message);
    }

    res.json(data.response);
  } catch (error) {
    if (error instanceof Error) {
      errorHandler(res, error.message, 400)
    }
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const data = await updateUser(parseInt(id), body);

    //Checking if there are errors
    if (data.type === "Error") {
      throw new Error(data.message);
    }

    return res.json(data);
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
