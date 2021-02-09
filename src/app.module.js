import express, { response } from 'express';
import morgan from 'morgan'
import AppRouting from './app.routing';
import BodyParser from 'body-parser';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(BodyParser.json({ limit: '50mb' }));
app.use(BodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));
app.use('', AppRouting);
app.use(express.static(__dirname + "/public"));

export default app