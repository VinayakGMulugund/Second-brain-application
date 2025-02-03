import {connect} from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const createConnection = async () => {
    try {
        if (process.env.MONGODB_URL) await connect(process.env.MONGODB_URL);
        else throw new Error("Please set mongo db url in env")
    } catch (error) {
        throw error;
    }
}

export default createConnection