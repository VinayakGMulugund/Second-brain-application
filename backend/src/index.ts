import express, { Request, Response } from "express";
import { userRouter } from "./routes/user";
import createConnection from "./config/dbconfig";

const app = express();

app.use(express.json());

app.use('/api/v1/user', userRouter);


app.listen(3000, () => {
    try {
        createConnection()
    } catch {
        console.log('Couldnt connect to db');
        process.exit();
    }
    console.log('server started on port - 3000')
});

