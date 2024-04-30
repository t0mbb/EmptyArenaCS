import express from 'express';
import mongoose from 'mongoose';
import routerAccount from './routers/account';
import routermemberCard from './routers/membercard';
import routerOrders from './routers/orders';
import routerPoolTable from './routers/pooltable';
import routerProduct from './routers/product';
import { handleError, handleNotFound } from './middlewares/handle-error';

import cors from 'cors';


const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

async function main() {
  await mongoose.connect(process.env.MONGODB);

  app.use(
    cors({
      origin: 'http://localhost:4200',
      optionsSuccessStatus: 200,
    })
  );

  app.use(express.json());

  app.use(routerAccount);
  app.use(routermemberCard);
  app.use(routerOrders);
  app.use(routerPoolTable);
  app.use(routerProduct);
  app.use(handleError);

  app.use(handleNotFound);
}

main().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`[ ready ] On port ${port}`);
});
