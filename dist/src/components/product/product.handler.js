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
const express_1 = require("express");
const product_modle_1 = require("./product.modle");
const store = new product_modle_1.TheProductStore();
const getAllProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield store.index();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const product = yield store.show(id);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const createNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const p = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };
        const theNewProduct = yield store.create(p);
        res.json(theNewProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield store.delete(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const ProductRoutes = (0, express_1.Router)();
ProductRoutes.get('/', getAllProducts);
ProductRoutes.get('/:id', getProduct);
ProductRoutes.post('/new', createNewProduct);
ProductRoutes.delete('/:id', deleteProduct);
exports.default = ProductRoutes;
