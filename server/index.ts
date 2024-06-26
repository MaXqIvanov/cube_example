import { Request, Response } from 'express';

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.resolve('../dist')));

app.get('/*', (req: Request, res: Response) => {
	console.log(path.join(__dirname, '..', '/dist', 'index.html'));

	res.sendFile(path.join(__dirname, '..', '/dist', 'index.html'));
});

app.listen(5010, () => {
	console.log('Application listening on port 5010!');
});
