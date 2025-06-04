import mongoose from "mongoose";
import dotenv from "dotenv"


const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MongoDB_URL);
        console.log("Connected to Database");
    } catch (error) {
        console.log("Failed to connect Database");
        process.exit(1);
    }
}

export default connectToDB;