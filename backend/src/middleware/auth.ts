import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { configDotenv } from "dotenv";
configDotenv();

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) {
        res.status(401).json({message: 'Missing token'});
        return;
    }
    try {
        // @ts-ignore
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // @ts-ignore
        req.userId = decodedToken.payload.userId;
        // @ts-ignore
        req.username = decodedToken.payload.username;
        next();
    } catch (error) {
        res.status(401).json('Bad request');
    }
}