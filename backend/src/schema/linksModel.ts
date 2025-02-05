import { model, Schema } from "mongoose";

const linkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
});

export const linksModel = model("Link", linkSchema);
