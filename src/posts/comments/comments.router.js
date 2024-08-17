const {
  postComment,
  listComments,
  replyToComment,
  listReplies
} = require("./comments.controller");
const rateLimiter = require("./helper/rate-limiter.middleware");

const commentsRouter = (express) => {
  const router = express.Router();

  router.get("/:postId/comments", async (req, res) => {
    const response = await listComments(req);
    res.status(response.statusCode).json(response);
  });
  router.get("/:postId/comments/:commentId/expand", async (req, res) => {
    const response = await listReplies(req);
    res.status(response.statusCode).json(response);
  });

  router.use(rateLimiter);

  router.post("/:postId/comments", async (req, res) => {
    const response = await postComment(req);
    res.status(response.statusCode).json(response);
  });
  router.post("/:postId/comments/:commentId/reply", async (req, res) => {
    const response = await replyToComment(req);
    res.status(response.statusCode).json(response);
  });

  return router;
};
module.exports = commentsRouter;
