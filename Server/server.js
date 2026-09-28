const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const cors = require("cors");
const { ConnectionDB } = require("./Connection");

ConnectionDB(process.env.DB_URL).then(() => {
  console.log("MongoDb Connected");
});

const Admin = require("./routes/admin");
const Blog = require("./routes/blog");

// Middleware
const corsOptions = {
  origin: "https://ai-powered-blog-project-8d98.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Routes
app.use("/api", Admin);
app.use("/api/blog", Blog);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started at Port: ${process.env.PORT}`);
});