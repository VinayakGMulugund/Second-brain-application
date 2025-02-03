import { Model, Schema } from "mongoose";

const linkSchema = new Schema({
    hash: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, required: true, ref: 'User'}
});

export const linksModel = new Model(linkSchema, "Link");