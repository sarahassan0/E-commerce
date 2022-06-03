"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const jwt = process.env.JWT_SECRET;
        (0, jsonwebtoken_1.verify)(token, jwt);
        next();
    }
    catch (err) {
        res.status(401);
        res.json(`could not access,  your token is invalid . Error${err}`);
    }
};
exports.default = userToken;
