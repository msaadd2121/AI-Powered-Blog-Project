const express = require("express");
const router = express.Router();

const {
  AdminLogin,
  GetAllComments,
  GetAllBlogs,
  DeleteComment,
  ApproveCommentbyId,
  GetDashboard,
} = require("../controllers/admin");
const { auth } = require("../middleware/auth");

router.post("/login", AdminLogin);
router.get("/comments", auth, GetAllComments);
router.get("/blogs", auth, GetAllBlogs);
router.post("/delete-comment", auth, DeleteComment);
router.post("/approve-comment", auth, ApproveCommentbyId);
router.get("/dashboard", auth, GetDashboard);

module.exports = router;
