const userRouter = require("../src/user/user.router");
require("../DB/index");

const expressConfig = (app, express) => {
  app.use(express.json());
  app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Content-type, Authorization, Cache-control, Pragma"
    );
    next();
  });

  app.get("/", (req, res) => {
    res
      .status(200)
      .json({ status: true, message: "Multi level comment system API" });
  });
  app.use("/api/v1/users", userRouter(express));

  app.get("*", function (req, res) {
    res.status(404).json({ status: false, message: "Route not found" });
  });
};
module.exports = expressConfig;
