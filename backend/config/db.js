import mongoose from "mongoose";
import 'dotenv/config';

async function connection() {
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("Connected to database successfully");
    } catch (error) {
        console.log("Database connection failed:", error);
    }
}

export default connection;
