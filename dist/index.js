"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// import { checkingEnvVariables } from './config/checking-env-variables';
// import { startDbConnection } from './config/sequelize';
// import Logger from './src/middlewares/logger';
// const start = async() => {
//   checkingEnvVariables();
//   await startDbConnection();
const port = 8000;
app_1.default.listen(port, () => console.log(`your server is running at http://localhost:${port}`));
