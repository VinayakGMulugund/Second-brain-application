import { Router, Request, Response } from "express";
import { UserModel } from "../schema/userModel";
import { validateUserRequest } from "../middleware/requestValidator";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

const userRouter = Router();

userRouter.post('/signup', validateUserRequest, async (req: Request, res: Response) => {
    try {
        if (await UserModel.exists({ username: req.body.username })) {
            res.status(403).json({ message: "User exists" });
        } else {
            const user = await UserModel.create({
                username: req.body.username,
                password: req.body.password
            });
            res.json({ message: `Successfully created user with username ${user.username}` });
        }
    } catch (error) {
        res.status(500).json({ message: `Failed to create user with username ${req.body.username}` });
    }
});

userRouter.post('/login', validateUserRequest, async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username }) as any;
        if (!user) {
            res.status(403).json({ message: "Wrong Username or password" });
            return;
        }
        try {
            const match = await user.comparePassword(req.body.password);
            if (!match) {
                res.status(403).json({ message: "Wrong Username or password" });
                return;
            }

            const secret = process.env.JWT_SECRET || 'secret';
            const token = jwt.sign({ username: user.username, userId: user._id }, secret);
            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default userRouter;
