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
exports.getFullClientBalance = exports.getMonthOperationData = exports.getTodayOperationData = exports.getFullOperationData = void 0;
const Operation_1 = require("../entities/Operation");
const getFullOperationData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield Operation_1.Operation.findBy({ userId: parseInt(id) });
        return res.json(response);
    }
    catch (error) {
        error instanceof Error && res.status(500).json("Internal server error");
    }
});
exports.getFullOperationData = getFullOperationData;
const getTodayOperationData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let operation = yield Operation_1.Operation.findOneBy({
            userId: parseInt(id),
            createdAt: new Date().getDate(),
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
        });
        if (!operation) {
            operation = new Operation_1.Operation();
            operation.year = new Date().getFullYear();
            operation.month = new Date().getMonth() + 1;
            operation.createdAt = new Date().getDate();
            operation.userId = parseInt(id);
            yield operation.save();
            return res.json(operation);
        }
        return res.json(operation);
    }
    catch (error) {
        error instanceof Error && res.status(500).send("Server internal error");
    }
});
exports.getTodayOperationData = getTodayOperationData;
const getMonthOperationData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { month, year } = req.body;
        const operation = yield Operation_1.Operation.findBy({
            userId: parseInt(id),
            year: year,
            month: month,
        });
        let incomes = 0;
        operation.forEach((op) => (incomes += op.userGain));
        let outcomes = 0;
        operation.forEach((op) => (outcomes += op.userLost));
        return res.json({
            userGain: incomes,
            userLost: outcomes,
        });
    }
    catch (error) {
        error instanceof Error && res.status(500).send("Server internal error");
    }
});
exports.getMonthOperationData = getMonthOperationData;
const getFullClientBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const operation = yield Operation_1.Operation.findBy({ userId: parseInt(id) });
        let totalBalance = 0;
        operation.forEach((op) => {
            totalBalance += op.userTotalBalance;
        });
        return res.json({ total: totalBalance });
    }
    catch (error) {
        error instanceof Error && res.status(500).json("Internal server error");
    }
});
exports.getFullClientBalance = getFullClientBalance;
