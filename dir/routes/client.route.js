"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
exports.router = router;
const client_controller_1 = require("../controllers/client.controller");
const authorization = require("../middleware/authorization");
router.get("/user:id/clientes", client_controller_1.getItems);
router.get("/cliente/:id", client_controller_1.getClient);
router.post("/nuevo-cliente", client_controller_1.addClient);
router.delete("/user:userId/cliente:clientId", client_controller_1.deleteClient);
router.post("/cliente/:id", client_controller_1.updateClient);
router.put("/user:userId/cliente:clientId/agregar-saldo", client_controller_1.addToClientBalance);
router.put("/user:userId/cliente:clientId/descontar-saldo", client_controller_1.substractFromClientBalance);
router.get("/user:id/buscar-cliente", client_controller_1.searchClient);
router.get("/user:id/clientes/ordenar-por-nombre-asc", client_controller_1.orderByClientNameAsc);
router.get("/user:id/clientes/ordenar-por-nombre-desc", client_controller_1.orderByClientNameDesc);
router.get("/user:id/clientes/ordenar-por-saldo-asc", client_controller_1.orderByClientBalanceAsc);
router.get("/user:id/clientes/ordenar-por-saldo-desc", client_controller_1.orderByClientBalanceDesc);
router.get("/user:userId/clientes/cantidad-clientes", client_controller_1.getClientsQuantity);