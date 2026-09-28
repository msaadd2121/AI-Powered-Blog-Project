const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const Comment = require("../models/Comments");
async function AdminLogin(req, res, next) {
  const { email, password } = req.body;
  try {
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.PASSWORD
    ) {
      return res.json({ sucess: false, message: "Invalid Email or Password" });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

async function GetAllBlogs(req, res) {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}
async function GetAllComments(req, res) {
  try {
    const comments = await Comment.find()
      .populate("blog")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
async function GetDashboard(req, res) {
  try {
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      dashboardData: {
        blogs,
        comments,
        drafts,
        recentBlogs,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
async function DeleteComment(req, res) {
  try {
    const { commentId } = req.body;

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    res.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

async function ApproveCommentbyId(req, res) {
  try {
    const { id } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    res.json({
      success: true,
      message: "Comment approved Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  AdminLogin,
  GetAllBlogs,
  GetAllComments,
  GetDashboard,
  DeleteComment,
  ApproveCommentbyId,
};
