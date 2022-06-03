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
const product_modle_1 = require("../../components/product/product.modle");
const store = new product_modle_1.TheProductStore();
describe('Check on CRUD methods', () => {
    it('should have an index method', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(store.index).toBeDefined();
    }));
    it('should have a show method', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(store.show).toBeDefined();
    }));
    it('should have a creat method', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(store.create).toBeDefined();
    }));
    it('should have a delete method', () => __awaiter(void 0, void 0, void 0, function* () {
        const ll = 'kk';
        console.log(ll);
        expect(store.delete).toBeDefined();
    }));
});
describe('Check on CRUD methods return`s', () => {
    it('create method should add product', () => __awaiter(void 0, void 0, void 0, function* () {
        const product = {
            name: "product1",
            price: 200,
            category: "skin care"
        };
        const result = yield store.create(product);
        console.log(result);
        expect(result).toEqual({
            id: 1,
            name: "product1",
            price: 200,
            category: "skin care"
        });
    }));
    it('should return a list of products using getProducts', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual([
            {
                id: 1,
                name: 'product!',
                price: 200,
                category: 'skin care'
            }
        ]);
    }));
    it('should return the correct product using getProductById', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show('2');
        expect(result).toEqual({
            id: 1,
            name: 'product!',
            price: 200,
            category: 'skin care'
        });
    }));
    it('should delete the correct product using deleteProduct', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.delete('1');
        expect(result).toEqual({
            id: 1,
            name: 'product!',
            price: 200,
            category: 'skin care'
        });
    }));
});
