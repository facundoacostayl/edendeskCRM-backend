import { UserType } from "../interfaces/user.interface";
import { User } from "../config/entities/User";
import { Operation } from "../config/entities/Operation";
import { responseHandler } from "../utils/response.handle";
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
  firstname: UserType["firstname"],
  loginemail: UserType["loginemail"],
  password: UserType["password"]
) => {

  //Verify if user is already authenticated
  const userRequest = await User.findOneBy({ loginemail });

  //Verify if user doesn't exist, otherwise returning error
  if (userRequest !== null) {
    return responseHandler("Error", 409, "User already exist");
  }

  //Creating a new user
  const user = new User();
  user.firstname = firstname as string;
  user.loginemail = loginemail as string;

  //Bcrypt password
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const bcryptPassword = await bcrypt.hash(password, salt);
  user.password = bcryptPassword;

  //Saving User in database
  await user.save();

  //Creating and saving operation column
  const operation = new Operation();
  operation.userId = user.id;
  operation.year = new Date().getFullYear();
  operation.month = new Date().getMonth() + 1;

  await operation.save();

  //Generating JWT Token
  const response = await User.findOneBy({ loginemail });
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
  loginemail: UserType["loginemail"],
  password: UserType["password"]
) => {

  //Check if user exists
  const userRequest = await User.findOneBy({ loginemail: loginemail });

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
  const user = await User.findOneBy({ loginemail: loginemail });
  const userId = user && user.id;

  //Response
  const response = { token, userId: user && user.id };

  return responseHandler("Success", 200, "Logged in succesfully");
};

const updateUser = async (id: UserType["id"], body: UserType) => {

  //Verify if data exists, otherwise returning error
  if (!Object.keys(body).length) {
    return responseHandler("Error", 404, "There's no data to update");
  }

  //Bcrypt password
  if (body.password) {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(body.password, salt);
    body.password = bcryptPassword;
  }

  //Generating query and parsing data if necessary
  const queryBuilder = () => {
    let query = `UPDATE users SET `;
    query += Object.keys(body)
      .map((key) => {
        const valueToSet =
          typeof body[key as keyof UserType] === "string"
            ? `'${body[key as keyof UserType]}'`
            : parseInt(body[key as keyof UserType] as string);
        return `${key} = ${valueToSet}`;
      })
      .join(", ");

    return query + ` WHERE id = ${id};`;
  };

  //Sending query
  await User.query(queryBuilder()!);

  //Response
  const response = await User.findOneBy({ id });

  return responseHandler("Success", 200, "User updated succesfully", response!);

};

export { getUser, createUser, loginUser, updateUser };
