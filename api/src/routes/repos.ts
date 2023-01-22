import { Router, Request, Response } from 'express';
import { Repo } from '../models/Repo';
import axios from 'axios';
import fs from 'fs/promises';
import { flatten } from 'lodash';
import { AppError } from '../models/AppError';
export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
	res.setHeader('Content-Type', 'application/json');
	const gitDataPromise = axios
		.get('https://api.github.com/users/silverorange/repos')
		.then((response) => {
			return response.data;
		});
	const fileDataPromise = fs.readFile('./data/repos.json').then((response) => {
		return JSON.parse(response.toString());
	});
	const promises = [gitDataPromise, fileDataPromise];
	Promise.all(promises)
		.then((resp) => {
			const responseData = flatten(resp).filter(
				(dataItem: Repo) => !dataItem.fork
			);
			res.status(200).json(responseData);
		})
		.catch((err: Error) => {
			const status = err instanceof AppError ? err.status : 500;
			if (err) {
				res.status(500).send({
					status,
					message: 'Internal server error',
				});
			}
		});
});
