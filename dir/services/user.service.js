"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.loginUser = exports.createUser = exports.getUser = void 0;
const User_1 = require("../config/entities/User");
const Operation_1 = require("../config/entities/Operation");
const response_handle_1 = require("../utils/response.handle");
const httpStatusCodes_1 = require("../utils/httpStatusCodes");
const userRoles_1 = require("../utils/userRoles");
const db_1 = require("../config/db/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_handle_1 = require("../utils/jwt.handle");
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //Find User
    const user = yield User_1.User.findOneBy({ id });
    //Verify if user exists, otherwise returning error
    if (user === null) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.BAD_REQUEST, "El usuario no existe");
    }
    return (0, response_handle_1.responseHandler)("Success", httpStatusCodes_1.httpStatusCodes.OK, "Usuario encontrado exitosamente", user);
});
exports.getUser = getUser;
const createUser = (firstName, loginEmail, password) => __awaiter(void 0, void 0, void 0, function* () {
    //Verify if user is already authenticated
    const user = yield User_1.User.findOneBy({ loginEmail });
    //Verify if user doesn't exist, otherwise returning error
    if (user !== null) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.BAD_REQUEST, "El usuario ya existe");
    }
    //Creating a new user
    const newUser = new User_1.User();
    newUser.firstName = firstName;
    newUser.loginEmail = loginEmail;
    newUser.role = userRoles_1.ROLE.BASIC;
    //Bcrypt password
    const saltRound = 10;
    const salt = yield bcryptjs_1.default.genSalt(saltRound);
    const bcryptPassword = yield bcryptjs_1.default.hash(password, salt);
    newUser.password = bcryptPassword;
    //Saving User in database
    yield newUser.save();
    //Creating and saving operation column
    const operation = new Operation_1.Operation();
    operation.user = newUser.id;
    operation.creationYear = new Date().getFullYear();
    operation.creationMonth = new Date().getMonth() + 1;
    operation.creationDay = new Date().getDate();
    yield operation.save();
    //Generating JWT Token
    const createdUser = yield User_1.User.findOneBy({ loginEmail });
    if (createdUser) {
        const token = (0, jwt_handle_1.jwtGenerator)(createdUser.id, createdUser.role);
        return (0, response_handle_1.responseHandler)("Success", httpStatusCodes_1.httpStatusCodes.CREATED, "Usuario creado exitosamente", createdUser, token);
    }
    return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.INTERNAL_SERVER, "Internal Server Error");
});
exports.createUser = createUser;
const loginUser = (loginEmail, password) => __awaiter(void 0, void 0, void 0, function* () {
    //Check if user exists
    const user = yield User_1.User.findOneBy({ loginEmail: loginEmail });
    //Verify if user exists, otherwise returning error
    if (user === null) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.BAD_REQUEST, "El usuario no existe");
    }
    //Check if incomming password is the same the database password
    const validPassword = yield bcryptjs_1.default.compare(password, user.password);
    if (!validPassword) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.UNAUTHORIZED, "Contraseña incorrecta");
    }
    //Give the jwt token to the user
    const token = (0, jwt_handle_1.jwtGenerator)(user.id, user.role);
    return (0, response_handle_1.responseHandler)("Success", httpStatusCodes_1.httpStatusCodes.OK, "Inicio de sesión exitoso", user, token);
});
exports.loginUser = loginUser;
const updateUser = (userid, userData) => __awaiter(void 0, void 0, void 0, function* () {
    //Verify if data exists, otherwise returning error
    if (!Object.keys(userData).length) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.BAD_REQUEST, "No hay datos para actualizar");
    }
    if (userData.loginEmail) {
        const user = yield User_1.User.findOneBy({ id: userid });
        if (user) {
            if (user.loginEmail === userData.loginEmail) {
                return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.BAD_REQUEST, "No puedes modificar tu Email por el mismo");
            }
        }
    }
    //Bcrypt password
    if (userData.password) {
        const saltRound = 10;
        const salt = yield bcryptjs_1.default.genSalt(saltRound);
        const bcryptPassword = yield bcryptjs_1.default.hash(userData.password, salt);
        userData.password = bcryptPassword;
    }
    //Execute update query
    const updateUser = yield db_1.AppDataSource
        .createQueryBuilder()
        .update(User_1.User)
        .set(userData)
        .where("id = :userid", { userid })
        .execute();
    //Find user
    const user = yield User_1.User.findOneBy({ id: userid });
    //Verify if user exists, otherwise returning error
    if (!updateUser || !user) {
        return (0, response_handle_1.responseHandler)("Error", httpStatusCodes_1.httpStatusCodes.BAD_REQUEST, "Usuario no encontrado");
    }
    return (0, response_handle_1.responseHandler)("Success", httpStatusCodes_1.httpStatusCodes.OK, "Usuario actualizado exitosamente", user);
});
exports.updateUser = updateUser;
