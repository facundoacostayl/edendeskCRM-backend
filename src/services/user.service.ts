import { UserType } from "../interfaces/user.interface";
import { User } from "../config/entities/User";
import { Operation } from "../config/entities/Operation";
import { responseHandler } from "../utils/response.handle";
import {httpStatusCodes} from "../utils/httpStatusCodes";
import { AppDataSource as dataSource } from "../config/db/db";
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

const getUser = async (id: UserType["id"]) => {
  //Find User
  const user = await User.findOneBy({ id });

  //Verify if user exists, otherwise returning error
  if (user === null) {
    return responseHandler("Error", httpStatusCodes.BAD_REQUEST, "User doesn't exist");
  }

  return responseHandler("Success", httpStatusCodes.OK, "User found succesfully", user);
};

const createUser = async (
  firstName: UserType["firstName"],
  loginEmail: UserType["loginEmail"],
  password: UserType["password"]
) => {
  //Verify if user is already authenticated
  const user = await User.findOneBy({ loginEmail });

  //Verify if user doesn't exist, otherwise returning error
  if (user !== null) {
    return responseHandler("Error", httpStatusCodes.BAD_REQUEST, "User already exist");
  }

  //Creating a new user
  const newUser = new User();
  newUser.firstName = firstName as string;
  newUser.loginEmail = loginEmail as string;

  //Bcrypt password
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const bcryptPassword = await bcrypt.hash(password, salt);
  newUser.password = bcryptPassword;

  //Saving User in database
  await newUser.save();

  //Creating and saving operation column
  const operation = new Operation();
  operation.user = newUser.id;
  operation.creationYear = new Date().getFullYear();
  operation.creationMonth = new Date().getMonth() + 1;

  await operation.save();

  //Generating JWT Token
  const createdUser = await User.findOneBy({ loginEmail });
  const token = jwtGenerator(user, createdUser!.id);

  return responseHandler(
    "Success",
    httpStatusCodes.CREATED,
    "User created succesfully",
    createdUser!,
    token
  );
};

const loginUser = async (
  loginEmail: UserType["loginEmail"],
  password: UserType["password"]
) => {
  //Check if user exists
  const user = await User.findOneBy({ loginEmail: loginEmail });

  //Verify if user exists, otherwise returning error
  if (user === null) {
    return responseHandler("Error", httpStatusCodes.BAD_REQUEST, "User doesn't exist");
  }

  //Check if incomming password is the same the database password
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return responseHandler("Error", httpStatusCodes.UNAUTHORIZED, "Incorrect Password");
  }

  //Give the jwt token to the user
  const token = jwtGenerator(user.id);
  const loggedUser = await User.findOneBy({ loginEmail: loginEmail });
  const userid = loggedUser && loggedUser.id;

  return responseHandler("Success", httpStatusCodes.OK, "Logged in succesfully", loggedUser!, token);
};

const updateUser = async (userid: UserType["id"], userData: UserType) => {
  //Verify if data exists, otherwise returning error
  if (!Object.keys(userData).length) {
    return responseHandler("Error", httpStatusCodes.BAD_REQUEST, "There's no data to update");
  }

  //Bcrypt password
  if (userData.password) {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(userData.password, salt);
    userData.password = bcryptPassword;
  }

  //Execute update query
  const updateUser = await dataSource
    .createQueryBuilder()
    .update(User)
    .set(userData)
    .where("id = :userid", { userid })
    .execute();

  //Find user
  const user = await User.findOneBy({ id: userid });

  //Verify if user exists, otherwise returning error
  if (!updateUser || !user) {
    return responseHandler("Error", httpStatusCodes.BAD_REQUEST, "User not found");
  }

  return responseHandler("Success", httpStatusCodes.OK, "User updated succesfully", user);
};

export { getUser, createUser, loginUser, updateUser };
