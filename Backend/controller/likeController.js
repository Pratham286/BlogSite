import { Blog } from "../models/Blog.js";
import { User } from "../models/User.js";

export const registerLike = async (req, res) => {
  try {
    const userId = req.user.id;
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog data not found" });
    }
    const alreadyLiked = blog.likedUser.includes(userId);
    if (alreadyLiked) {
      return res
        .status(400)
        .json({ message: "Blog is already liked by the user." });
    }
    blog.likedUser.push(userId);
    await blog.save();
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.likedBlog.push(blogId);
    await user.save();
    return res.status(200).json({message: "Blog liked successfully"});
} catch (error) {
    return res.status(500).json({ message: "Internal Error" });
}
};
export const deregisterLike = async (req, res) => {
    try {
        const userId = req.user.id;
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "Blog data not found" });
        }
        const alreadyLiked = blog.likedUser.includes(userId);
        if (!alreadyLiked) {
            return res
            .status(400)
            .json({ message: "Blog is not liked by the user." });
        }
        await Blog.findByIdAndUpdate(blogId, {
            $pull: { likedUser: userId },
        });
        await User.findByIdAndUpdate(userId, {
            $pull: { likedBlog: blogId },
        });
        return res.status(200).json({message: "Blog unliked successfully"});
        
    } catch (error) {
        return res.status(500).json({ message: "Internal Error" });
    }
};
export const checkLike = async (req, res) => {
  try {
    const userId = req.user.id;
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog data not founded" });
    }
    const alreadyLiked = blog.likedUser.includes(userId);
    if (alreadyLiked) {
      return res
        .status(200)
        .json({ message: "Blog is already liked by the user.", isLiked : true });
    }
    return res.status(200).json({message: "Blog liked successfully", isLiked : false});
} catch (error) {
    return res.status(500).json({ message: "Internal Error" });
}
};
