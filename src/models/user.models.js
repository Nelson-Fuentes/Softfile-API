import { Schema, model } from 'mongoose';
import bcrypt from "bcryptjs";
import { DEFAULT_STATUS } from '../app.config'
import UserStatus from './user.status.models';

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: Schema.Types.ObjectId, ref: "user_status", required: true }
});

UserSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
UserSchema.statics.comparePassword = async(password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}
UserSchema.statics.statusDefault = async() => {
    return await UserStatus.findOne({ name: DEFAULT_STATUS[0] })
}

UserSchema.statics.statusActive = async() => {
    return await UserStatus.findOne({ name: DEFAULT_STATUS[1] })
}

UserSchema.statics.statusInactive = async() => {
    return await UserStatus.findOne({ name: DEFAULT_STATUS[2] })
}

UserSchema.statics.statusDeleted = async() => {
    return await UserStatus.findOne({ name: DEFAULT_STATUS[3] })
}

export default model("user", UserSchema);