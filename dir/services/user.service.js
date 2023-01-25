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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.loginUser = exports.createUser = exports.getUser = void 0;
const User_1 = require("../config/entities/User");
const Operation_1 = require("../config/entities/Operation");
const response_handle_1 = require("../utils/response.handle");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //Find User
    const userRequest = yield User_1.User.findOneBy({ id });
    //Verify if user exists, otherwise returning error
    if (userRequest === null) {
        return (0, response_handle_1.responseHandler)("Error", 404, "User doesn't exist");
    }
    return (0, response_handle_1.responseHandler)("Success", 200, "User found succesfully", userRequest);
});
exports.getUser = getUser;
const createUser = (firstname, loginemail, password) => __awaiter(void 0, void 0, void 0, function* () {
    //Verify if user is already authenticated
    const userRequest = yield User_1.User.findOneBy({ loginemail });
    //Verify if user doesn't exist, otherwise returning error
    if (userRequest !== null) {
        return (0, response_handle_1.responseHandler)("Error", 409, "User already exist");
    }
    //Creating a new user
    const user = new User_1.User();
    user.firstname = firstname;
    user.loginemail = loginemail;
    //Bcrypt password
    const saltRound = 10;
    const salt = yield bcrypt.genSalt(saltRound);
    const bcryptPassword = yield bcrypt.hash(password, salt);
    user.password = bcryptPassword;
    //Saving User in database
    yield user.save();
    //Creating and saving operation column
    const operation = new Operation_1.Operation();
    operation.userId = user.id;
    operation.year = new Date().getFullYear();
    operation.month = new Date().getMonth() + 1;
    yield operation.save();
    //Generating JWT Token
    const response = yield User_1.User.findOneBy({ loginemail });
    const token = jwtGenerator(user, user.id);
    return (0, response_handle_1.responseHandler)("Success", 201, "User created succesfully", response, token);
});
exports.createUser = createUser;
const loginUser = (loginemail, password) => __awaiter(void 0, void 0, void 0, function* () {
    //Check if user exists
    const userRequest = yield User_1.User.findOneBy({ loginemail: loginemail });
    //Verify if user exists, otherwise returning error
    if (userRequest === null) {
        return (0, response_handle_1.responseHandler)("Error", 404, "User doesn't exist");
    }
    //Check if incomming password is the same the database password
    const validPassword = yield bcrypt.compare(password, userRequest.password);
    if (!validPassword) {
        return (0, response_handle_1.responseHandler)("Error", 404, "Incorrect Password");
    }
    //Give the jwt token to the user
    const token = jwtGenerator(userRequest.id);
    const user = yield User_1.User.findOneBy({ loginemail: loginemail });
    const userId = user && user.id;
    //Response
    const response = { token, userId: user && user.id };
    return (0, response_handle_1.responseHandler)("Success", 200, "Logged in succesfully");
});
exports.loginUser = loginUser;
const updateUser = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    //Verify if data exists, otherwise returning error
    if (!Object.keys(body).length) {
        return (0, response_handle_1.responseHandler)("Error", 404, "There's no data to update");
    }
    //Bcrypt password
    if (body.password) {
        const saltRound = 10;
        const salt = yield bcrypt.genSalt(saltRound);
        const bcryptPassword = yield bcrypt.hash(body.password, salt);
        body.password = bcryptPassword;
    }
    //Generating query and parsing data if necessary
    const queryBuilder = () => {
        let query = `UPDATE users SET `;
        query += Object.keys(body)
            .map((key) => {
            const valueToSet = typeof body[key] === "string"
                ? `'${body[key]}'`
                : parseInt(body[key]);
            return `${key} = ${valueToSet}`;
        })
            .join(", ");
        return query + ` WHERE id = ${id};`;
    };
    //Sending query
    yield User_1.User.query(queryBuilder());
    //Response
    const response = yield User_1.User.findOneBy({ id });
    return (0, response_handle_1.responseHandler)("Success", 200, "User updated succesfully", response);
});
exports.updateUser = updateUser;
