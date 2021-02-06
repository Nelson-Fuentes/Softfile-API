import { Schema, model } from 'mongoose';

const DegreeSchema = new Schema({
    name: { type: String, unique: true, required: true },
});


export default model("degree", DegreeSchema);