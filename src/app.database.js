import mongoose from "mongoose";
import { config } from 'dotenv';

config()
const uri = 'mongodb+srv://' + process.env.USERNAME_DB + ':' + process.env.PASSWORD + '@cluster0.hzqsk.mongodb.net/' + process.env.DBNAME + '?retryWrites=true&w=majority'

mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then((db) => console.log(`DB is connected`))
    .catch((err) => {
        console.log(err);
    });