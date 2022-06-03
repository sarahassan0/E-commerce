import express, { Application, Request, Response, json } from 'express';
import mongoose from "mongoose";
import { config } from './config';
import ProductRoutes from './components/product/product.handler'
import user_store from './components/user/user.handler';
import OrderRoutes from './components/order/order.handler';

const app: Application = express();
const port: number = 8080

// Connecting to MongoDB
mongoose.connect( config.url ).then((): void => {
  console.log("Database Connected");
}).catch((err): void => {
  throw new Error(err);
});

app.use(json());

app.get('/', (_req: Request, res: Response): void => {
  res.send("Welcome to the store's home page");
});

user_store(app)
// app.use('/products' , ProductRoutes);
// app.use('/orders' , OrderRoutes)

app.listen(port, (): void =>
  console.log(`your server is running at http://localhost:${port}`)
);