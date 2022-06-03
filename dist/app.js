"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_handler_1 = __importDefault(require("./src/components/product/product.handler"));
const user_handler_1 = __importDefault(require("./src/components/user/user.handler"));
const order_handler_1 = __importDefault(require("./src/components/order/order.handler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send("Welcome to the store's home page");
});
app.use('/products', product_handler_1.default);
app.use('/users', user_handler_1.default);
app.use('/orders', order_handler_1.default);
exports.default = app;
