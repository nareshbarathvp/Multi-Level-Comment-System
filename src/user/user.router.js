const { verifyToken } = require("./helpers/auth.helper");
const { userRegister, userLogin, getUser } = require("./user.controller");

const userRouter = (express) => {
  const router = express.Router();

  router.post("/register", async (req, res) => {
    const response = await userRegister(req);
    res.status(response.statusCode).json(response);
  });
  router.post("/login", async (req, res) => {
    const response = await userLogin(req);
    res.status(response.statusCode).json(response);
  });

  router.use(verifyToken);
  router.get("/", async (req, res) => {
    const response = await getUser(req?.data?._id);
    res.status(response.statusCode).json(response);
  });

  return router;
};
module.exports = userRouter;
