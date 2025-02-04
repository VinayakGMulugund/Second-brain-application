import express, { NextFunction, Request, Response } from "express";
import { UserModel } from "../schema/userModel";
import { validateUserCreationData } from "../middleware/requestValidator"

const userRouter = express.Router();

userRouter.post('/signup', validateUserCreationData, async (req: Request, res: Response) => {
    try {
        if(await UserModel.exists({username: req.body.username})) {
            res.status(403).json({message: "User exists"})
        } else {
            const user = await UserModel.create({
                username: req.body.username,
                password: req.body.password
            });
            console.log(user);
            res.json({message: `Successfully created user with username ${user.username}`})
        }
    } catch (error) {
        res.status(500).json({error, message: "Failed to create user with username " + req.body.username})
    }
});

userRouter.post('/login', validateUserCreationData, async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({username: req.body.username}) as any;
        if (!user) {
            res.status(403).json({message: "Wrong Username or password"});
            return;
        }
        try {
            const match = await user.comparePassword(req.body.password);
            console.log(match)
            if (!match) {
                res.status(403).json({message: "Wrong Username or password"});
                return;
            }
            res.status(201).json({message: "Login Successfull"});
        } catch (error) {
            res.status(500).json({message: "Internal server error"})
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
});


export {userRouter}