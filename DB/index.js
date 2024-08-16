const mongoose = require("mongoose");
const connectionStr =
  process.env.DB || "mongodb://localhost:27017/comment-system";

mongoose
  .connect(connectionStr)
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.error(err));
