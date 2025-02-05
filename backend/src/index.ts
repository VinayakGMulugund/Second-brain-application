import express, { Request, Response } from "express";
import userRouter from "./routes/user";
import createConnection from "./config/dbconfig";
import contentRouter from "./routes/content";
import shareRouter from "./routes/brain";

const app = express();

app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/content', contentRouter);
app.use('/api/v1/brain', shareRouter)


app.listen(3000, () => {
    try {
        createConnection()
    } catch {
        console.log('Couldnt connect to db');
        process.exit();
    }
    console.log('server started on port - 3000')
});

