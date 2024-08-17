const { verifyToken } = require("../user/helpers/auth.helper");
const commentsRouter = require("./comments/comments.router");
const {
  viewPost,
  postPost,
  editPost,
  deletePost
} = require("./post.controller");

const postRouter = (express) => {
  const router = express.Router();
  router.use(verifyToken);

  router.get("/", async (req, res) => {
    const response = await viewPost();
    res.status(response.statusCode).json(response);
  });
  router.post("/", async (req, res) => {
    const response = await postPost(req);
    res.status(response.statusCode).json(response);
  });
  router.patch("/:postId", async (req, res) => {
    const response = await editPost(req);
    res.status(response.statusCode).json(response);
  });
  router.delete("/:postId", async (req, res) => {
    const response = await deletePost(req);
    res.status(response.statusCode).json(response);
  });

  router.use("/", commentsRouter(express));

  return router;
};
module.exports = postRouter;
