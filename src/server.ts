import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

// import "./database"
import createConnection from '@database/index'
import "@shared/container"

import { router } from '@routes/index';
import { AppError } from '@errors/AppError';

createConnection();
const app = express()

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error ${err.message}`,
    });
  },
);

app.listen(3333, () => console.log("Server is running!"))