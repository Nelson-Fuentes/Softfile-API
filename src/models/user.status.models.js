import { Schema, model } from 'mongoose';

const UserStatusSchema = new Schema({
    name: { type: String, unique: true, required: true }
});


export default model("user_status", UserStatusSchema);