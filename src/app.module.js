import express, { response } from 'express';
import morgan from 'morgan'
import AppRouting from './app.routing';
import BodyParser from 'body-parser';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())
app.use(morgan('dev'));
app.use('', AppRouting);

export default app