import mongoose,{Schema, model} from "mongoose";

const commentSchema = new Schema({
    message: {
        type: String,
        trim: true,
        required : true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    blogname :{
        type: Schema.Types.ObjectId,
        ref:"Blog",
        required: true,
    },
    Date:{
        type: Date,
        required: true,
        default: Date.now,
    },
},{timestamps: true});

export const Comment = model("Comment", commentSchema);