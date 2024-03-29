import { UserType } from "../interfaces/user.interface";
import { User } from "../config/entities/User";
import { Operation } from "../config/entities/Operation";
import { responseHandler } from "../utils/response.handle";
import { httpStatusCodes } from "../utils/httpStatusCodes";
import { ROLE } from "../utils/userRoles";
import { AppDataSource as dataSource } from "../config/db/db";
import bcrypt from "bcryptjs";
import { jwtGenerator } from "../utils/jwt.handle";

const getUser = async (id: UserType["id"]) => {
  //Find User
  const user = await User.findOneBy({ id });

  //Verify if user exists, otherwise returning error
  if (user === null) {
    return responseHandler(
      "Error",
      httpStatusCodes.BAD_REQUEST,
      "El usuario no existe"
    );
  }

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Usuario encontrado exitosamente",
    user
  );
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
    return responseHandler(
      "Error",
      httpStatusCodes.BAD_REQUEST,
      "El usuario ya existe"
    );
  }

  //Creating a new user
  const newUser = new User();
  newUser.firstName = firstName as string;
  newUser.loginEmail = loginEmail as string;
  newUser.role = ROLE.BASIC;

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
  operation.creationDay = new Date().getDate();

  await operation.save();

  //Generating JWT Token
  const createdUser = await User.findOneBy({ loginEmail });

  if (createdUser) {
    const token = jwtGenerator(createdUser.id, createdUser.role);

    return responseHandler(
      "Success",
      httpStatusCodes.CREATED,
      "Usuario creado exitosamente",
      createdUser,
      token
    );
  }

  return responseHandler(
    "Error",
    httpStatusCodes.INTERNAL_SERVER,
    "Internal Server Error"
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
    return responseHandler(
      "Error",
      httpStatusCodes.BAD_REQUEST,
      "El usuario no existe"
    );
  }

  //Check if incomming password is the same the database password
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return responseHandler(
      "Error",
      httpStatusCodes.UNAUTHORIZED,
      "Contraseña incorrecta"
    );
  }

  //Give the jwt token to the user
  const token = jwtGenerator(user.id, user.role);

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Inicio de sesión exitoso",
    user,
    token
  );
};

const updateUser = async (userid: UserType["id"], userData: UserType) => {
  //Verify if data exists, otherwise returning error
  if (!Object.keys(userData).length) {
    return responseHandler(
      "Error",
      httpStatusCodes.BAD_REQUEST,
      "No hay datos para actualizar"
    );
  }

  if (userData.loginEmail) {
    const user = await User.findOneBy({ id: userid });
    if (user) {
      if (user.loginEmail === userData.loginEmail) {
        return responseHandler(
          "Error",
          httpStatusCodes.BAD_REQUEST,
          "No puedes modificar tu Email por el mismo"
        );
      }
    }
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
    return responseHandler(
      "Error",
      httpStatusCodes.BAD_REQUEST,
      "Usuario no encontrado"
    );
  }

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Usuario actualizado exitosamente",
    user
  );
};

export { getUser, createUser, loginUser, updateUser };
