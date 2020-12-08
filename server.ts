import express, {Request, Response} from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { errorHandler } from './server/middlewares/error-handler';

const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello From Typescript')
})

const start = () => {
  app.listen(port, ()=> {
    console.log(`App is listening on port ${port}`)
  })
}

start();
