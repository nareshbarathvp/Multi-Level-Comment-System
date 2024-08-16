require("dotenv").config();
const express = require("express");
const expressConfig = require("./config/express.config");
const PORT = process.env.PORT || 3000;

const app = express();
expressConfig(app, express);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
