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

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api", Admin);
app.use("/api/blog", Blog);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Startd at Port :${process.env.PORT}`);
});
