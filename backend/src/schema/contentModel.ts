import { Model, Schema } from "mongoose";

const contentTypes = ['image', 'video', 'article', 'audio'];

const contentSchema = new Schema({
    link: {type: String, required: true},
    type: {type: String, required: true, enum: contentTypes},
    title: {type: String},
    tags: {type: Array<Schema.Types.ObjectId>, ref: 'Tag'},
    userId: {type: Schema.Types.ObjectId, ref: 'User'}
});

export const contentModel = new Model(contentSchema, "Content");