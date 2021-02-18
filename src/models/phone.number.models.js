import { Schema, model } from 'mongoose';

const PhoneNumberSchema = new Schema({
    number: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    code: { type: Schema.Types.ObjectId, ref: "phoneCode", required: true }
});

export default model("phone", PhoneNumberSchema);