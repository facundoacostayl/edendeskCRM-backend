import { UserType } from "../interfaces/user.interface";
import { User } from "../config/entities/User";
import { Operation } from "../config/entities/Operation";
import { responseHandler } from "../utils/response.handle";
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

const getUser = async (id: UserType["id"]) => {
  const userRequest = await User.findOneBy({ id });

  if (userRequest === null) {
    return responseHandler("Error", 400, "User doesn't exist");
  }

  return responseHandler("Success", 200, "User doesn't exist", userRequest);
};

const createUser = async (
  firstname: UserType["firstname"],
  loginemail: UserType["loginemail"],
  password: UserType["password"]
) => {
  //Verify if user is already authenticated
  const userRequest = await User.findOneBy({ loginemail });

  if (userRequest !== null) {
    return responseHandler("Error", 400, "User already exist");
  }

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

  //Creating operation column
  const operation = new Operation();
  operation.userId = user.id;
  operation.year = new Date().getFullYear();
  operation.month = new Date().getMonth() + 1;

  await operation.save();

  //Generating JWT Token
  const response = await User.findOneBy({loginemail});
  const token = jwtGenerator(user, user.id);

  return responseHandler("Success", 200, "User created successfully", response!, token);
};

const loginUser = async (
  loginemail: UserType["loginemail"],
  password: UserType["password"]
) => {
  //Check if user exists
  const userRequest = await User.findOneBy({ loginemail: loginemail });

  if (userRequest === null) {
    return responseHandler("Error", 400, "User doesn't exist");
  }

  //Check if incomming password is the same the database password
  const validPassword = await bcrypt.compare(password, userRequest.password);

  if (!validPassword) {
    return responseHandler("Error", 400, "Incorrect Password");
  }

  //Give the jwt token to the user

  const token = jwtGenerator(userRequest.id);
  const user = await User.findOneBy({ loginemail: loginemail });
  const userId = user && user.id;

  const response = { token, userId: user && user.id };

  return responseHandler("Success", 200, "Logged in succesfully");

};

const updateUser = async (id: UserType["id"], body: UserType) => {
  if (Object.keys(body).length === 0) {
    return {
      type: "Error",
      statusCode: 400,
      message: "There's no data to update",
    };
  }

  //Bcrypt password
  if (body.password) {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(body.password, salt);
    body.password = bcryptPassword;
  }

  //Generating query
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

  await User.query(queryBuilder()!);

  const response = await User.findOneBy({ id });

  return {
    type: "Success",
    statusCode: 200,
    message: "Login successful",
    response,
  };
};

export { getUser, createUser, loginUser, updateUser };
