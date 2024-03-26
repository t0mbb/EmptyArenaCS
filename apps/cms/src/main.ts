import express from 'express';
import mongoose from 'mongoose';
import router from './routers';
import { handleError, handleNotFound } from './middlewares/handle-error';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

async function main() {
  await mongoose.connect(process.env.MONGODB);
  app.use(router);

  app.use(handleError);

  app.use(handleNotFound);
}

main().catch((err) => console.log(err));

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
