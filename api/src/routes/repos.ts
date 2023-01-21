import { Router, Request, Response } from 'express';
import { Repo } from '../models/Repo';
import axios from 'axios';
import fs from 'fs';
export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { data }: { data: Repo[] } = await axios.get(
      'https://api.github.com/users/silverorange/repos'
    );
    const reposData: Buffer = fs.readFileSync('./data/repos.json');
    const responseData = [...JSON.parse(reposData.toString()), ...data].filter(
      (dataItem: Repo) => !dataItem.fork
    );
    res.status(200).json(responseData);
  } catch (err) {
    res.status(500).send('Server error');
  }
});
