import mongoose from "mongoose";
import { config } from 'dotenv';

config()
const uri = 'mongodb+srv://' + process.env.USERNAME_MONGODB + ':' + process.env.PASSWORD + '@cluster0.hzqsk.mongodb.net/' + process.env.DATABASE + '?retryWrites=true&w=majority'

export const connect_database = async() => {
    return await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
};