import express, { NextFunction, Request, Response } from "express";
import { UserModel } from "../schema/userModel";
import { validateUserCreationData } from "../middleware/requestValidator"

const userRouter = express.Router();

userRouter.post('/signup', validateUserCreationData, async (req: Request, res: Response) => {
    try {
        const user = await UserModel.create({
            username: req.body.username,
            password: req.body.password
        });
        console.log(user);
        res.json({message: `Successfully created user with username ${user.username}`})
    } catch (error) {
        res.json({error, message: "Failed to create user with username" + req.body.username})
    }
})

export {userRouter}