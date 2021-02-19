import { Schema, model } from 'mongoose';

const SocialNet = new Schema({
    name: { type: String, required: true, unique: true },
    domain: { type: String },
    fontawesome: { type: String }
});

export default model("socialnet", SocialNet);