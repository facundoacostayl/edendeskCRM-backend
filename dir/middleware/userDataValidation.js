"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validUpdateUserInfo = exports.validAuthUserInfo = void 0;
const validAuthUserInfo = (req, res, next) => {
    //Req body
    const { firstName, loginEmail, password } = req.body;
    //Function for validating loginEmail with regex
    const validEmail = (loginemail) => {
        // eslint-disable-next-line
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginemail);
    };
    //Function for validating firstName with regex
    const validName = (name) => {
        // eslint-disable-next-line
        return /[^a-zA-Z\s]/g.test(name);
    };
    //Requiring paths and validating body data
    if (req.path === "/register") {
        if (![firstName, loginEmail, password].every(Boolean)) {
            return res.json({ message: "Completa los campos" });
        }
        else if (validName(firstName)) {
            return res.status(401).json({ message: "Nombre invalido" });
        }
        else if (!validEmail(loginEmail)) {
            return res.status(401).json({ message: "Email invalido" });
        }
    }
    if (req.path === "/login") {
        if (![loginEmail, password].every(Boolean)) {
            return res.status(401).json({ message: "Completa los campos" });
        }
        else if (!validEmail(loginEmail)) {
            return res.status(401).json({ message: "Email invalido" });
        }
    }
    next();
};
exports.validAuthUserInfo = validAuthUserInfo;
const validUpdateUserInfo = (req, res, next) => {
    //Req body
    const { loginEmail } = req.body;
    //Function for validating loginEmail with regex
    const validEmail = (loginemail) => {
        // eslint-disable-next-line
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginemail);
    };
    //Requiring paths and validating body data
    if (loginEmail) {
        if (!validEmail(loginEmail)) {
            return res.status(401).json({ message: "Email invalido" });
        }
    }
    next();
};
exports.validUpdateUserInfo = validUpdateUserInfo;
