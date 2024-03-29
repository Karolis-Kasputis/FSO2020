"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.get('/api/ping', (_req, res) => {
    res.status(200).json('pong');
});
const PORT = 3001;
app.listen(PORT, () => console.log('server running at port: ', PORT));
