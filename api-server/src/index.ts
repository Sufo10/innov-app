import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter';
import config from './config/config';
import './database/connection';

const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Sujan!');
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});