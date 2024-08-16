const { userRegister } = require("./user.controller");

const userRouter = (express) => {
  const router = express.Router();

  router.post("/register", async (req, res) => {
    const respose = await userRegister(req);
    res.status(respose.statusCode).json(respose);
  });

  return router;
};
module.exports = userRouter;
