import { Schema, model } from 'mongoose';

const CountrySchema = new Schema({
    name: { type: String, unique: true, required: true },
});

export default model("country", CountrySchema);