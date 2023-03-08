"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validUpdateClientInfo = exports.validNewClientInfo = void 0;
const validNewClientInfo = (req, res, next) => {
    //Req body
    const { firstName, lastName, tel } = req.body;
    //Function for validating firstName and lastName with regex
    const validName = (name) => {
        // eslint-disable-next-line
        return /[^a-zA-Z\s]/g.test(name);
    };
    //Requiring paths and validating body data
    if (![firstName, lastName, tel].every(Boolean)) {
        return res.json("Completa los campos");
    }
    else if (validName(firstName) || validName(lastName)) {
        return res.status(401).json({ message: "Nombre o apellido inválido" });
    }
    next();
};
exports.validNewClientInfo = validNewClientInfo;
const validUpdateClientInfo = (req, res, next) => {
    //Req body
    const { firstName, lastName, addType } = req.body;
    //Function for validating firstName and lastName with regex
    const validName = (name) => {
        // eslint-disable-next-line
        return /[^a-zA-Z\s]/g.test(name);
    };
    if (validName(firstName) || validName(lastName) || validName(addType)) {
        return res.status(401).json({ message: "Datos no validos" });
    }
    next();
};
exports.validUpdateClientInfo = validUpdateClientInfo;
