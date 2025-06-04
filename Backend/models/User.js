import mongoose, {model, Schema} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
    },
    email: {
        type: String,
        required: true,
        trim: true, 
    },
    password: {
        type: String,
        required: true,
        // minLength: 6,
    }
    
}, {timestamps: true});

export const User = model("User", userSchema);