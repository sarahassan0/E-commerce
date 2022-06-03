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
exports.TheProductStore = void 0;
const database_1 = require("../../database");
class TheProductStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.Database.connect();
                const sql = 'SELECT * FROM Products';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot display the products. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM Products WHERE id=($1)';
                const conn = yield database_1.Database.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot find product ${id}. Error: ${err}`);
            }
        });
    }
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO Products (name, price , category) VALUES($1, $2, $3) RETURNING *';
                const conn = yield database_1.Database.connect();
                const result = yield conn.query(sql, [p.name, p.price, p.category]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot add new product. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM Products WHERE id=($1)';
                const conn = yield database_1.Database.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`unable to delete this product. Error: ${err}`);
            }
        });
    }
}
exports.TheProductStore = TheProductStore;
