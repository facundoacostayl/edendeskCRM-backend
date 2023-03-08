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
                required: ["firstName", "loginEmail", "password"],
                properties: {
                    firstName: {
                        type: "string",
                    },
                    lastName: {
                        type: "string"
                    },
                    loginEmail: {
                        type: "string",
                    },
                    password: {
                        type: "string"
                    }
                },
            },
            client: {
                type: "object",
                required: ["firstName", "tel", "user"],
                properties: {
                    firstName: {
                        type: "string",
                    },
                    lastName: {
                        type: "string",
                    },
                    balance: {
                        type: "number"
                    },
                    tel: {
                        type: "string"
                    },
                    lastAddDate: {
                        type: "string"
                    },
                    lastAddAmount: {
                        type: "number"
                    },
                    addType: {
                        type: "string"
                    },
                    lastWithdrawDate: {
                        type: "string"
                    },
                    lastWithdrawAmount: {
                        type: "number"
                    },
                    branch: {
                        type: "string"
                    },
                    user: {
                        type: "number"
                    }
                },
            },
            operation: {
                type: "object",
                required: ["creationMonth", "creationYear"],
                properties: {
                    creationDay: {
                        type: "number",
                    },
                    creationMonth: {
                        type: "number"
                    },
                    creationYear: {
                        type: "number",
                    },
                    userEarnings: {
                        type: "number"
                    },
                    userLosses: {
                        type: "number"
                    },
                    totalSumOfBalances: {
                        type: "number"
                    },
                    dayTransactions: {
                        type: "number"
                    },
                    user: {
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
