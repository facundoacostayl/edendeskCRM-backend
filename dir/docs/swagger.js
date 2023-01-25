"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Edendesk Documentation",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:4000",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
        schemas: {
            user: {
                type: "object",
                required: ["firstname", "loginemail", "password"],
                properties: {
                    firstname: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    },
                    password: {
                        type: "string"
                    }
                },
            },
            client: {
                type: "object",
                required: ["clientid", "nombre", "telefono", "userid"],
                properties: {
                    clientid: {
                        type: "string",
                    },
                    nombre: {
                        type: "string",
                    },
                    apellido: {
                        type: "string",
                    },
                    saldo: {
                        type: "number"
                    },
                    telefono: {
                        type: "string"
                    },
                    fechaultcarga: {
                        type: "string"
                    },
                    montoultcarga: {
                        type: "number"
                    },
                    tipodecarga: {
                        type: "string"
                    },
                    fechaultretiro: {
                        type: "string"
                    },
                    montoultretiro: {
                        type: "number"
                    },
                    sucursal: {
                        type: "string"
                    },
                    userid: {
                        type: "number"
                    }
                },
            },
        },
    },
};
const swaggerOptions = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"],
};
exports.default = (0, swagger_jsdoc_1.default)(swaggerOptions);
