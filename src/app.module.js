import express, { response } from 'express';
import morgan from 'morgan'
import AppRouting from './app.routing';

const app = express();
app.use(morgan('dev'));
app.use('', AppRouting);

export default app