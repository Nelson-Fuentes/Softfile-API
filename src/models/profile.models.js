import { Schema, model } from 'mongoose';

const ProfileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    image: { type: String, unique: true },
    wallpaper: { type: String, unique: true },
    description: { type: String },
    degree: { type: Schema.Types.ObjectId, ref: "profile" }
});

export default model("profile", ProfileSchema);