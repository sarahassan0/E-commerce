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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_modle_1 = require("./user.modle");
const jsonwebtoken_1 = require("jsonwebtoken");
const userToken_1 = __importDefault(require("../../middlewares/userToken"));
const store = new user_modle_1.TheUserStore();
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield store.show(id);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        };
        const id = req.body.id;
        const jwt = process.env.JWT_SECRET;
        const token = (0, jsonwebtoken_1.sign)({ id }, jwt);
        const theNewUser = yield store.create(u);
        res.json(Object.assign({ token }, theNewUser));
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const authUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signIn = yield store.auth(_req.body.username, _req.body.password);
        res.status(200).json(signIn);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.delete(req.params.id);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const UserRoutes = (0, express_1.Router)();
UserRoutes.get('/', userToken_1.default, getAllUsers);
UserRoutes.get('/:id', userToken_1.default, getUser);
UserRoutes.post('/new', createNewUser);
UserRoutes.post('/signin', userToken_1.default, authUser);
UserRoutes.delete('/:id', userToken_1.default, deleteUser);
exports.default = UserRoutes;
