import { Schema, model } from 'mongoose';

const EmailSchema = new Schema({
    adress: { type: String, unique: true, required: true },
    validated: { type: Boolean, required: true, default: false },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true }
});


export default model("email", EmailSchema);