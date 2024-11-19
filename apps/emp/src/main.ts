import express from 'express';
import mongoose from 'mongoose';
import routerAccount from './routers/account';
import routerMatch from './routers/match';
import routerRank from './routers/rank'
import routerSchedule from './routers/schedule';

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
  app.use(routerMatch);
  app.use(routerRank);
  app.use(routerSchedule);
  app.use(handleError);
  app.use(handleNotFound);
}

main().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`[ ready ] On port ${port}`);
});
