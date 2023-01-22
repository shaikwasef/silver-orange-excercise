import { Router, Request, Response } from 'express';
import { Repo } from '../models/Repo';
import axios from 'axios';
import fs from 'fs/promises';
export const repos = Router();
const lodash = require('lodash');

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
			const responseData = lodash
				.flatten(resp)
				.filter((dataItem: Repo) => !dataItem.fork);
			res.status(200).json(responseData);
		})
		.catch((err: Error) => {
			res.status(500).json({
				status: 500,
				message: err.message,
			});
		});
});
