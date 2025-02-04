import { Request, Response } from "express";
import { CallbackError, model, Schema } from "mongoose";
import bcrypt from "bcrypt"


const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return;
    }
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error as Error);
    }
})

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error
    }
}

export const UserModel = model("User", userSchema);