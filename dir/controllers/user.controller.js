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
exports.authorizeToken = exports.updateUser = exports.loginUser = exports.createUser = exports.getUser = void 0;
const User_1 = require("../config/entities/User");
const Operation_1 = require("../config/entities/Operation");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.User.findOneBy({ id: parseInt(id) });
        return res.json(user);
    }
    catch (error) {
        error instanceof Error && res.status(500).json("Internal server error");
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Require body
        const { firstname, loginemail, password } = req.body;
        //Verify if user is already authenticated
        const userRequest = yield User_1.User.findOneBy({ loginemail: loginemail });
        if (userRequest === null) {
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
            //Creating operation column
            const operation = new Operation_1.Operation();
            operation.userId = user.id;
            operation.year = new Date().getFullYear();
            operation.month = new Date().getMonth() + 1;
            yield operation.save();
            //Generating JWT Token
            const token = jwtGenerator(user, user.id);
            return res.json({ token: token, id: user.id });
        }
        else {
            return res.status(401).send("Ya existe un usuario con ese email");
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Require body
        const { loginemail, password } = req.body;
        //Check if user exists
        const userRequest = yield User_1.User.findOneBy({ loginemail: loginemail });
        if (userRequest === null) {
            return res.status(401).json("No existe el usuario");
        }
        //Check if incomming password is the same the database password
        const validPassword = yield bcrypt.compare(password, userRequest.password);
        if (!validPassword) {
            return res.status(401).json("El email o contraseña es incorrecta");
        }
        //Give the jwt token to the user
        const token = jwtGenerator(userRequest.id);
        const user = yield User_1.User.findOneBy({ loginemail: loginemail });
        const userId = user && user.id;
        res.json({ token: token, id: userId });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json(error.message);
        }
    }
});
exports.loginUser = loginUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { body } = req;
        //Bcrypt password
        if (body.password) {
            const saltRound = 10;
            const salt = yield bcrypt.genSalt(saltRound);
            const bcryptPassword = yield bcrypt.hash(body.password, salt);
            body.password = bcryptPassword;
        }
        //Generating query
        const queryBuilder = () => {
            if (Object.keys(body).length === 0)
                return null;
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
        yield User_1.User.query(queryBuilder());
        const response = yield User_1.User.findOneBy({ id: parseInt(id) });
        return res.json(response);
    }
    catch (error) {
        error instanceof Error && res.status(500).json(error.message);
    }
});
exports.updateUser = updateUser;
const authorizeToken = (req, res) => {
    try {
        res.json(true);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json(error.message);
        }
    }
};
exports.authorizeToken = authorizeToken;
