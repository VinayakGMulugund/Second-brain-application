import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";


const userRegistrationSchema = z.object({
    username: z.string().min(3).max(10),
    password: z.string().min(8).max(20)
        .regex(new RegExp('[a-z]'), 'Atleast one lowercase letter required')
        .regex(new RegExp('[A-Z]'), "Atleast one uppercase letter required")
        .regex(new RegExp("[!@#$%^&*()_+=;]"), "Atleast one special character required")
        .regex(new RegExp('.*[0-9].*'), "Atleast one number is required")
});


const validateUserCreationData = (req: Request, res: Response, next: NextFunction) => {
    try {
        userRegistrationSchema.parse(req.body);
        next();
    } catch (error) {
        console.log('Body:', req.body);
        if (error instanceof ZodError) {
            res.status(411).json(error);
        }
        else res.status(500).json({ message: "Failed to validate input request paylod"})
    }
}

export {validateUserCreationData}