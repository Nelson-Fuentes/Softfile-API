import mongoose from "mongoose";
import { config } from 'dotenv';

config()
const uri = 'mongodb+srv://' + process.env.DATABASE_USER + ':' + process.env.DATABASE_PASSWORD + '@cluster0.hzqsk.mongodb.net/' + process.env.DATABASE_NAME + '?retryWrites=true&w=majority'

export const connect_database = async() => {
    return await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
};