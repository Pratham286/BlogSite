import mongoose, { model, Schema } from "mongoose";

const blogSchema = new Schema({
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
    title:{
        type: String,
        required: true,
        trim: true,
    },
    Date:{
        type: Date,
        required: true,
        default: Date.now,
    },
    content:{
        type: String,
        required: true,
        trim: true,
    },
    
}, {timestamps: true});

export const Blog = model("Blog", blogSchema);