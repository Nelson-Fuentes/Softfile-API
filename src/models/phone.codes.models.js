import { Schema, model } from 'mongoose';

const PhoneCodeSchema = new Schema({
    code: { type: Number, unique: true, required: true },
    iso2: { type: String, unique: true, required: true },
    iso3: { type: String, unique: true, required: true },
});

export default model("phoneCode", PhoneCodeSchema);