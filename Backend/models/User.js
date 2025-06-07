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
    },
    
    likedBlog: [{
        type: Schema.Types.ObjectId,
        ref: "Blog",
    }],
    
}, {timestamps: true});

export const User = model("User", userSchema);