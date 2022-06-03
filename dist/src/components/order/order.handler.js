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
const order_modle_1 = require("./order.modle");
const userToken_1 = __importDefault(require("../../middlewares/userToken"));
const store = new order_modle_1.TheOrderStore();
const getAllOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const order = yield store.show(id);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const createNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const o = {
            user_id: req.body.user_id,
            status: req.body.status
        };
        const theNewOrder = yield store.create(o);
        res.json(theNewOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield store.delete(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const getCurrentOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.user_id;
        const order = yield store.showCurrentOrder(user_id);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const addNewProductToOrder = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order_id = _req.params.id;
    const product_id = _req.body.product_id;
    const quantity = _req.body.quantity;
    try {
        const Product = yield store.addProduct(order_id, product_id, quantity);
        res.json(Product);
    }
    catch (err) {
        res.status(400);
        res.json(err + '11');
    }
});
const OrderRoutes = (0, express_1.Router)();
OrderRoutes.get('/', getAllOrders);
OrderRoutes.get('/:id', getOrder);
OrderRoutes.post('/new', createNewOrder);
OrderRoutes.delete('/:id', deleteOrder);
OrderRoutes.get('/user/:user_id', userToken_1.default, getCurrentOrder);
OrderRoutes.post('/:id/products', addNewProductToOrder);
exports.default = OrderRoutes;
