import { Router, Request, Response } from 'express';
import { Repo } from '../models/Repo';
import axios from 'axios';
import fs from 'fs';
import { AppError } from '../models/AppError';
export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { data: gitDataPromise } = await axios.get<Repo[]>(
      'https://api.github.com/users/silverorange/repos'
    );
    const fileData = JSON.parse(
      fs.readFileSync('./data/repos.json').toString()
    );
    const responseData = [...gitDataPromise, ...fileData].filter(
      (dataItem: Repo) => !dataItem.fork
    );
    res.status(200).json(responseData);
  } catch (err) {
    const status = err instanceof AppError ? err.status : 500;
    if (err) {
      res.status(500).send({
        status,
        message: 'Internal server error',
      });
    }
  }
});
