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
exports.startDbConnection = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
require('dotenv').config();
const config = {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};
if (process.env.NODE_ENV == 'test') {
    config.database = process.env.DB_TEST_NAME;
}
/*
  I used `!` here, because I'm gonna check anyway to see if these
  env variables are passed or not when the server starts
  refer to checking-env-variables.ts for reference
*/
const sequelize = new sequelize_typescript_1.Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
exports.sequelize = sequelize;
const startDbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('Connection to database has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
exports.startDbConnection = startDbConnection;
