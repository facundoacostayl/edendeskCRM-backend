"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfo = void 0;
const getInfo = (req, res) => {
    try {
        res.json(req.user);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        }
    }
};
exports.getInfo = getInfo;
