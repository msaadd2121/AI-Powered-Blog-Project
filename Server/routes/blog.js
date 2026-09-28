const express = require("express");
const Blogrouter = express.Router();
const upload = require("../middleware/multer");
const { auth } = require("../middleware/auth");

const {
  CreateBlog,
  AddAllBlogs,
  GetBlogById,
  DeleteBlog,
  tooglePublish,
  AddComment,
  getBlogComments,
  generateContent,
} = require("../controllers/blog");

Blogrouter.post("/add", upload.single("image"), auth, CreateBlog);
Blogrouter.get("/all", AddAllBlogs);
Blogrouter.get("/:blogId", GetBlogById);
Blogrouter.post("/delete", auth, DeleteBlog);
Blogrouter.post("/toogle-publish", auth, tooglePublish);
Blogrouter.post("/add-comment", AddComment);
Blogrouter.post("/comments", getBlogComments);
Blogrouter.post("/generate",auth, generateContent);


module.exports = Blogrouter;
