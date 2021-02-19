import { Schema, model } from 'mongoose';

const SocialUser = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    socialnet: { type: Schema.Types.ObjectId, ref: 'socialnet', required: true },
    link: { type: String, required: true, unique: true }
});

export default model("socialuser", SocialUser)