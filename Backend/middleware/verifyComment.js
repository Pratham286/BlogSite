// import { Blog } from "../models/Blog.js";

import { Comment } from "../models/Comment.js";

export const verifyComment = async (req, res, next) =>{
    const userId = req.user.id
    const commentId = req.params.id

    try {
        const comment = await Comment.findById(commentId);
        if(!comment){
            return res.status(404).json({message: "Comment not found"});
        }
        if(comment.author.toString() !== userId)
        {
            return res.status(403).json({message: "User is not owner of this comment"});
        }

        next();
    } catch (error) {
        res.status(500).json({message: "Internal Error"})
    }
}