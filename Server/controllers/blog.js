const { client } = require("../config/imagekit.js");
const Blog = require("../models/blog");
const fs = require("fs");
const Comment = require("../models/Comments.js");
const { main } = require("../config/gemini.js");

async function CreateBlog(req, res) {
  try {
    const { title,  subtitle, description, category, isPublished } = req.body;

    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    const response = await client.files.upload({
      file: fs.createReadStream(imageFile.path),
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    const optimizedImageUrl = client.helper.buildSrc({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      src: response.filePath,
      transformation: [
        {
          quality: "auto",
          format: "webp",
          width: 1280,
        },
      ],
    });

    const image = optimizedImageUrl;

    await Blog.create({
      title,
      subtitle,
      description,
      category,
      image,
      isPublished,
    });

    res.json({
      success: true,
      message: "Blog Added Successfully",
    });
  } catch (error) {
    console.log("CREATE BLOG ERROR:", error);

    res.json({
      success: false,
      message: error.message,
    });
  }
}
async function AddAllBlogs(req, res) {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}
async function GetBlogById(req, res) {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    return res.json({ success: true, blog });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Blog ID",
      });
    }
    res.json({ success: false, message: error.message });
  }
}
async function DeleteBlog(req, res) {
  try {
    const { id } = req.body;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    await Comment.deleteMany({ blog: id });

    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.json({ success: true, message: "Blog Deleted Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}
async function tooglePublish(req, res) {
  try {
    const { id } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.isPublished = !blog.isPublished;

    await blog.save();

    res.json({
      success: true,
      message: "Blog status updated",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function AddComment(req, res) {
  try {
    const { blogId, name, content } = req.body;
    await Comment.create({ blog: blogId, name, content });
    res.json({ success: true, message: "Blog Comment Added for Review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

async function getBlogComments(req, res) {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

async function generateContent(req, res) {
  try {
    const { prompt } = req.body;

    const content = await main(`
      Write a detailed blog article about "${prompt}".

      Return ONLY clean HTML content suitable for a Quill rich text editor.

      Use these HTML tags:
      <h2> for main headings
      <h3> for subheadings
      <p> for paragraphs
      <strong> for bold text
      <em> for italic text
      <ul> and <li> for bullet lists
      <ol> and <li> for numbered lists

      Do NOT use Markdown.
      Do NOT use ##.
      Do NOT use ###.
      Do NOT use **.
      Do NOT use * for formatting.
      Do NOT include html or code blocks in the response.
      Do NOT include a title outside the HTML content.

      Make the article easy to read with proper headings, subheadings, paragraphs and lists.
    `);

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  CreateBlog,
  AddAllBlogs,
  GetBlogById,
  DeleteBlog,
  tooglePublish,
  AddComment,
  getBlogComments,
  generateContent,
};
