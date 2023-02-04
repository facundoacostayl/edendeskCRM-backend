import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
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

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(swaggerOptions);