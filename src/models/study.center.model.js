import { Schema, model } from 'mongoose';

const StudyCenterSchema = new Schema({
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
});

export default model("study_center", StudyCenterSchema);