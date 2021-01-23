import express, { response } from 'express';
import morgan from 'morgan'
import AppRouting from './app.routing';
import BodyParser from 'body-parser';

const app = express();
app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())
app.use(morgan('dev'));
app.use('', AppRouting);

export default app