import { Request, Response } from "express";
import { User } from "../entities/User";
import {Operation} from '../entities/Operation';
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findOneBy({ id: parseInt(id) });

    return res.json(user);
  } catch (error) {
    error instanceof Error && res.status(500).json("Internal server error");
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    //Require body
    const { firstname, loginemail, password } = req.body;

    //Verify if user is already authenticated
    const userRequest = await User.findOneBy({ loginemail: loginemail });

    if (userRequest === null) {
      const user = new User();
      user.firstname = firstname;
      user.loginemail = loginemail;

      //Bcrypt password

      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const bcryptPassword = await bcrypt.hash(password, salt);
      user.password = bcryptPassword;

      //Saving User in database
      await user.save();

      //Creating operation column
      const operation = new Operation();
      operation.userId = user.id;
      operation.year = new Date().getFullYear();
      operation.month = new Date().getMonth() + 1;

      await operation.save();

      //Generating JWT Token
      const token = jwtGenerator(user, user.id);

      return res.json({ token: token, id: user.id });
    } else {
      return res.status(401).send("Ya existe un usuario con ese email");
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
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