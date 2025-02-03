import { Model, Schema } from "mongoose";

const tagSchema = new Schema({
    title: {type: String}
});

export const tagModel = new Model(tagSchema, "Tag");