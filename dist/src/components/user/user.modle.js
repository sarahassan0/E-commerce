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
exports.TheUserStore = void 0;
const database_1 = require("../../database");
const bcryptjs_1 = require("bcryptjs");
class TheUserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.Database.connect();
                const sql = 'SELECT * FROM Users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot display the users. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM Users WHERE id=($1)';
                const conn = yield database_1.Database.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot find user ${id}. Error: ${err}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield (0, bcryptjs_1.genSalt)(10);
                const sql = 'INSERT INTO Users (username ,firstName, lastName , password) VALUES($1, $2, $3 ,$4) RETURNING *';
                const conn = yield database_1.Database.connect();
                const hashedPassword = yield (0, bcryptjs_1.hashSync)(u.password, salt);
                const result = yield conn
                    .query(sql, [u.username, u.firstName, u.lastName, hashedPassword]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`unable create new user. Error: ${err}`);
            }
        });
    }
    auth(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.Database.connect();
            const sql = 'SELECT password FROM users WHERE username=($1)';
            const result = yield conn.query(sql, [username]);
            if (result.rows.length) {
                const user = result.rows[0];
                console.log(user);
                if ((0, bcryptjs_1.compareSync)(password, user.password)) {
                    return user;
                }
            }
            return null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM Users WHERE id=($1)';
                const conn = yield database_1.Database.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`unable to delete this user. Error: ${err}`);
            }
        });
    }
}
exports.TheUserStore = TheUserStore;
// / INSERT INTO Users (username ,firstName, lastName , password) VALUES('sara' , 'sss', 'hhh', 'pass123');   
