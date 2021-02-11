import { Schema, model } from 'mongoose';

const CitySchema = new Schema({
    name: { type: String, required: true },
    country: { type: Schema.Types.ObjectId, ref: "country", required: true }
});

export default model("city", CitySchema);