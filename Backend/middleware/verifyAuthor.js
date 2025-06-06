import { Blog } from "../models/Blog.js";

export const verifyAuthor = async (req, res, next) =>{
    const userId = req.user.id
    const blogId = req.params.id

    try {
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({message: "Blog not found"});
        }
        if(blog.author.toString() !== userId)
        {
            return res.status(403).json({message: "User is not owner of this blog"});
        }

        next();
    } catch (error) {
        res.status(500).json({message: "Internal Error"})
    }
}