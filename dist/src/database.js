"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_TEST_NAME, NODE_ENV, } = process.env;
if (NODE_ENV === 'dev') {
    exports.Database = new pg_1.Pool({
        host: DB_HOST,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD,
    });
}
else {
    exports.Database = new pg_1.Pool({
        host: DB_HOST,
        database: DB_TEST_NAME,
        user: DB_USER,
        password: DB_PASSWORD,
    });
}
//    "test": "set NODE_ENV=test&& db-migrate --env test up && jasmine-ts && npm run jasmine && npx db-migrate db:drop --env test"
//"test": "npx tsc && set NODE_ENV=test&& npx db-migrate db:create the_project_test && npx db-migrate -e test up && npm run jasmine-ts && npx db-migrate db:drop the_project_test" 
