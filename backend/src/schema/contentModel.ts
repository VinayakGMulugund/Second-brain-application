import { model, Schema } from "mongoose";

const contentTypes = ['image', 'video', 'article', 'audio'];

const contentSchema = new Schema({
    link: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: contentTypes },
    title: { type: String },
    tags: { type: [String] },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

export const contentModel = model("Content", contentSchema);
