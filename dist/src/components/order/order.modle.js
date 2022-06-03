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
exports.TheOrderStore = void 0;
const database_1 = require("../../database");
class TheOrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.Database.connect();
                const sql = 'SELECT * FROM Orders';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot display the Orders. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM Orders WHERE id=($1)';
                const conn = yield database_1.Database.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot find order ${id}. Error: ${err}`);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO Orders (user_id , status) VALUES ($1, $2) RETURNING *';
                const conn = yield database_1.Database.connect();
                const result = yield conn
                    .query(sql, [o.user_id, o.status]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`unable to create the order. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM Orders WHERE id=($1)';
                const conn = yield database_1.Database.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`unable to delete this order. Error: ${err}`);
            }
        });
    }
    showCurrentOrder(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.Database.connect();
                const sql = `SELECT  FROM Orders WHERE user_id = $1 ORDER BY id DESC LIMIT 1`;
                const result = yield conn.query(sql, [user_id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`unable to get current order. Error: ${err}`);
            }
        });
    }
    addProduct(order_id, product_id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO Order_products (order_id, product_id ,quantity ) VALUES($1, $2, $3) RETURNING *';
                const conn = yield database_1.Database.connect();
                const result = yield conn
                    .query(sql, [order_id, product_id, quantity]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not add the product to order ${order_id}. Error: ${err}`);
            }
        });
    }
}
exports.TheOrderStore = TheOrderStore;
