import express from 'express';
import mongoose from 'mongoose';
import routerIndex from './routers/index';
import routerContribution from './routers/contribution';
import routerFaculty from './routers/faculty';
import routerComment from './routers/comment';
import routerFile from './routers/fileUpload';
import { handleError, handleNotFound } from './middlewares/handle-error';
import seedData from './seed/role.seeds';
import cors from 'cors';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

async function main() {
  await mongoose.connect(process.env.MONGODB);
  await seedData();
  app.use(
    cors({
      origin: 'http://localhost:4200',
      optionsSuccessStatus: 200,
    })
  );

  app.use(express.json());

  app.use(routerIndex);
  app.use(routerContribution);
  app.use(routerFaculty);
  app.use(routerComment);
  app.use(routerFile);
  app.use(handleError);

  app.use(handleNotFound);
}

main().catch((err) => console.log(err));

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
