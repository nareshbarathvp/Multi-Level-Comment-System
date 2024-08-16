const { verifyToken } = require("./helpers/auth.helper");
const { userRegister, userLogin, getUser } = require("./user.controller");

const userRouter = (express) => {
  const router = express.Router();

  router.post("/register", async (req, res) => {
    const respose = await userRegister(req);
    res.status(respose.statusCode).json(respose);
  });
  router.post("/login", async (req, res) => {
    const respose = await userLogin(req);
    res.status(respose.statusCode).json(respose);
  });

  router.use(verifyToken);
  router.get("/", async (req, res) => {
    const respose = await getUser(req?.data?._id);
    res.status(respose.statusCode).json(respose);
  });

  return router;
};
module.exports = userRouter;
