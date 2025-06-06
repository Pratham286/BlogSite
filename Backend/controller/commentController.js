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
// export const getBlogComment = async (req, res) => {
//     try {
        
//     } catch (error) {
        
//     }
// }