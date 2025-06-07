import { Comment } from "../models/Comment.js";

export const createComment = async (req, res) =>{
    
    try {
        const {message, blogId} = req.body;
        const userId = req.user.id 
        const newComment = new Comment({
            message: message,
            author: userId,
            blogname: blogId,
        });
        await newComment.save();
        return res.status(200).json({message: "Comment was created!"})
    } catch (error) {
        return res.status(500).json({message: "Internal Error!"})
        
    }
}
export const getBlogComment = async (req, res) => {
    try {
        const blogId = req.params.id;
        const comment = await Comment.find({blogname: blogId}).populate("author", "name email").populate("blogname", "title content");
        if(comment)
        {
            return res.status(200).json({message: "Success", commentData: comment});
        }
        else{
            return res.status(404).json({message: "No data found"});
        }
    } catch (error) {
        console.log("Error :", error);
        return res.status(500).json({message: "Internal Error"});
    }
}
export const getUserComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const comment = await Comment.find({author: userId}).populate("author", "name email").populate("blogname", "title content");
        if(comment)
        {
            return res.status(200).json({message: "Success", commentData: comment});
        }
        else{
            return res.status(404).json({message: "No data found"});
        }
    } catch (error) {
        console.log("Error :", error);
        return res.status(500).json({message: "Internal Error"});
    }
}

export const deleteComment = async (req, res) =>{
    try {
        const commentId= req.params.id;
        const comment = await Comment.findByIdAndDelete(commentId);
        if(comment)
        {
            return res.status(200).json({message: "Comment Deleted"})
        }
        else{
            return res.status(404).json({message: "Comment not Found"})
        }
    } catch (error) {
        return res.status(500).json({message: "Internal error"});
    }
}

export const updateComment = async (req, res)=>{
    try {
        const {newMessage} = req.body; 
        const commentId = req.params.id;
        const comment = await Comment.findByIdAndUpdate(commentId, {
            message: newMessage,
        }, {new: true});
        if(comment)
            {
                return res.status(200).json({message: "Comment Updated successfully", commentData: comment});
            }
            else{
                return res.status(404).json({message:"Comment not found"});
            }
        } catch (error) {
            return res.status(500).json({message: "Internal error"});
        }
}