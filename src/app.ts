import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/router';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.get('/', (req: Request, res: Response) =>
  res.send('Welcome to Course Review backend project with authentication.'),
);

app.use(globalErrorHandler);

export default app;
