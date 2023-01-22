import { Request, Response } from "express";
import { User } from "../config/entities/User";
import {Operation} from '../config/entities/Operation';
import {getUser, createUser} from '../services/user.service';
import { errorHandler } from "../utils/error.handle";
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

export const getItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUser(parseInt(id));

    return res.json(user);
  } catch (error) {
    error instanceof Error && res.status(500).json("Internal server error");
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
    };

    return res.json(data);
    
  } catch (error) {
    if (error instanceof Error) {
      errorHandler(res, error.message, 400);
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    //Require body
    const { loginemail, password } = req.body;

    //Check if user exists
    const userRequest = await User.findOneBy({ loginemail: loginemail });

    if (userRequest === null) {
      return res.status(401).json("No existe el usuario");
    }

    //Check if incomming password is the same the database password
    const validPassword = await bcrypt.compare(password, userRequest.password);

    if (!validPassword) {
      return res.status(401).json("El email o contraseña es incorrecta");
    }

    //Give the jwt token to the user

    const token = jwtGenerator(userRequest.id);
    const user = await User.findOneBy({ loginemail: loginemail });
    const userId = user && user.id;

    res.json({ token: token, id: userId });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error.message);
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;

    //Bcrypt password
    if (body.password) {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const bcryptPassword = await bcrypt.hash(body.password, salt);
      body.password = bcryptPassword;
    }

    //Generating query
    const queryBuilder = () => {
      if (Object.keys(body).length === 0) return null;
      let query = `UPDATE users SET `;
      query += Object.keys(body)
        .map((key) => {
          const valueToSet =
            typeof body[key] === "string"
              ? `'${body[key]}'`
              : parseInt(body[key]);
          return `${key} = ${valueToSet}`;
        })
        .join(", ");

      return query + ` WHERE id = ${id};`;
    };

    await User.query(queryBuilder()!);

    const response = await User.findOneBy({ id: parseInt(id) });

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