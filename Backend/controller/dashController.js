import { Blog } from "../models/Blog.js";
import { User } from "../models/User.js";

export const verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "likedBlog",
      select: "title author Date content likedUser",
      populate: {
        path: "author",
        select: "name email", 
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "Verified", user: user, valid: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
};

export const getAllBlog = async (req, res) => {
  try {
    const blog = await Blog.find({}).populate("author", "name email");

    if (blog) {
      return res
        .status(200)
        .json({ message: "Blogs are accessed successfully!", blogData: blog });
    } else {
      return res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal error" });
  }
};
export const getUserBlog = async (req, res) => {
  const { id } = req.query;
  // console.log(email);
  try {
    const blog = await Blog.find({ author: id }).populate(
      "author",
      "name email"
    );
    // const blog = await Blog.find({email : email});
    if (blog) {
      return res
        .status(200)
        .json({ message: "Blogs are accessed successfully!", blogData: blog });
    } else {
      return res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal error" });
  }
};
export const getBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id).populate("author", "name email");
    if (blog) {
      return res.status(200).json({ message: "Blog found", blogData: blog });
    } else {
      return res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal error" });
  }
};
export const createBlog = async (req, res) => {
  try {
    const { name, email, title, content } = req.body;
    const userId = req.user.id;
    const date = new Date();
    // console.log(date.getDate())

    const newBlog = new Blog({
      title: title,
      content: content,
      author: userId,
    });
    await newBlog.save();
    return res.status(200).json({ message: "Blog was added" });
  } catch (error) {
    return res.status(400).json({ message: "Failed to add Blog" });
  }
};

export const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (blog) {
      return res.status(200).json({ message: "Blog Deleted" });
    } else {
      return res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal error" });
  }
};
export const updateBlog = async (req, res) => {
  const { newTitle, newContent } = req.body;

  // console.log(newTitle)

  const id = req.params.id;
  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        title: newTitle,
        content: newContent,
      },
      { new: true }
    );
    if (blog) {
      return res
        .status(200)
        .json({ message: "Blog Updated successfully", blogData: blog });
    } else {
      return res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal error" });
  }
};
export const deleteAllBlog = async (req, res) => {
  try {
    const blog = await Blog.deleteMany({});
    if (blog) {
      // console.log(blog);
      return res.status(200).json({ message: "All Blogs deleted" });
    } else {
      return res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal error" });
  }
};
