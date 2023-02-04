import { UserType } from "../interfaces/user.interface";
import { User } from "../config/entities/User";
import { Operation } from "../config/entities/Operation";
import { responseHandler } from "../utils/response.handle";
import { AppDataSource as dataSource } from "../config/db/db";
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

const getUser = async (id: UserType["id"]) => {
  //Find User
  const userRequest = await User.findOneBy({ id });

  //Verify if user exists, otherwise returning error
  if (userRequest === null) {
    return responseHandler("Error", 404, "User doesn't exist");
  }

  return responseHandler("Success", 200, "User found succesfully", userRequest);
};

const createUser = async (
  firstName: UserType["firstName"],
  loginEmail: UserType["loginEmail"],
  password: UserType["password"]
) => {
  //Verify if user is already authenticated
  const userRequest = await User.findOneBy({ loginEmail });

  //Verify if user doesn't exist, otherwise returning error
  if (userRequest !== null) {
    return responseHandler("Error", 409, "User already exist");
  }

  //Creating a new user
  const user = new User();
  user.firstName = firstName as string;
  user.loginEmail = loginEmail as string;

  //Bcrypt password
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const bcryptPassword = await bcrypt.hash(password, salt);
  user.password = bcryptPassword;

  //Saving User in database
  await user.save();

  //Creating and saving operation column
  const operation = new Operation();
  operation.user = user.id;
  operation.creationYear = new Date().getFullYear();
  operation.creationMonth = new Date().getMonth() + 1;

  await operation.save();

  //Generating JWT Token
  const response = await User.findOneBy({ loginEmail });
  const token = jwtGenerator(user, user.id);

  return responseHandler(
    "Success",
    201,
    "User created succesfully",
    response!,
    token
  );
};

const loginUser = async (
  loginEmail: UserType["loginEmail"],
  password: UserType["password"]
) => {
  //Check if user exists
  const userRequest = await User.findOneBy({ loginEmail: loginEmail });

  //Verify if user exists, otherwise returning error
  if (userRequest === null) {
    return responseHandler("Error", 404, "User doesn't exist");
  }

  //Check if incomming password is the same the database password
  const validPassword = await bcrypt.compare(password, userRequest.password);

  if (!validPassword) {
    return responseHandler("Error", 404, "Incorrect Password");
  }

  //Give the jwt token to the user
  const token = jwtGenerator(userRequest.id);
  const user = await User.findOneBy({ loginEmail: loginEmail });
  const userid = user && user.id;

  //Response
  const response = { token, userid: user && user.id };

  return responseHandler("Success", 200, "Logged in succesfully");
};

const updateUser = async (userid: UserType["id"], userData: UserType) => {
  //Verify if data exists, otherwise returning error
  if (!Object.keys(userData).length) {
    return responseHandler("Error", 404, "There's no data to update");
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
    return responseHandler("Error", 404, "User not found");
  }

  return responseHandler("Success", 200, "User updated succesfully", user);
};

export { getUser, createUser, loginUser, updateUser };
