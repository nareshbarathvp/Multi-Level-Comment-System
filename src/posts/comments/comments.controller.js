const { viewPostbyId } = require("../post.service");
const {
  createComment,
  viewComments,
  findOneComment,
  subCommentAdd,
  viewSubComments
} = require("./comments.service");

const sortMasterObj = {
  asc: 1,
  dec: -1
};

async function postComment(req) {
  try {
    const { postId } = req.params;
    const postCheck = await viewPostbyId(postId);
    if (!postCheck) throw new Error("Post not found");
    if (typeof req.body.comment != "string" || req.body.comment == "")
      throw new Error("Invalid comment");

    const commentObj = {
      postId,
      userName: req.data.name,
      comment: req.body.comment,
      createdBy: req.data._id
    };
    await createComment(commentObj);

    return {
      statusCode: 200,
      status: true,
      message: "Comment created successfully"
    };
  } catch (err) {
    return { statusCode: 400, status: false, message: err.message };
  }
}
async function listComments(req) {
  try {
    const { postId } = req.params;
    let { createdAt, replyCount, page, perPage } = req.query;
    const postCheck = await viewPostbyId(postId);
    if (!postCheck) throw new Error("Post not found");
    const findObj = { postId };
    const sortObj = {};
    createdAt = sortMasterObj[createdAt];
    replyCount = sortMasterObj[replyCount];
    if (typeof createdAt == "number") sortObj.createdAt = createdAt;
    if (typeof replyCount == "number") sortObj.replyCount = replyCount;
    if (!page) page = 1;
    if (!perPage) perPage = 10;

    const data = await viewComments(
      findObj,
      (page - 1) * perPage,
      perPage,
      sortObj
    );

    return { statusCode: 200, status: true, messgae: "Data found", data };
  } catch (err) {
    return { statusCode: 400, status: false, message: err.message };
  }
}
async function replyToComment(req) {
  try {
    const { postId, commentId } = req.params;
    const postCheck = await viewPostbyId(postId);
    if (!postCheck) throw new Error("Post not found");
    const commentCheck = await findOneComment(commentId);
    if (!commentCheck) throw new Error("Comment not found");
    if (typeof req.body.comment != "string" || req.body.comment == "")
      throw new Error("Invalid comment");

    const commentObj = {
      userName: req.data.name,
      comment: req.body.comment,
      createdBy: req.data._id,
      createdAt: new Date()
    };
    await subCommentAdd(commentId, commentObj);

    return {
      statusCode: 200,
      status: true,
      messgae: "Sub-comment posted successful"
    };
  } catch (err) {
    return { statusCode: 400, status: false, message: err.message };
  }
}
async function listReplies(req) {
  try {
    const { postId, commentId } = req.params;
    let { createdAt, page, perPage } = req.query;
    const postCheck = await viewPostbyId(postId);
    if (!postCheck) throw new Error("Post not found");
    const sortObj = { "replyArr.createdAt": 1 };
    createdAt = sortMasterObj[createdAt];
    if (typeof createdAt == "number") sortObj["replyArr.createdAt"] = createdAt;
    if (!page) page = 1;
    if (!perPage) perPage = 10;

    const data = await viewSubComments(
      commentId,
      (page - 1) * perPage,
      +perPage,
      sortObj
    );
    return { statusCode: 200, status: true, messgae: "Data found", data };
  } catch (err) {
    return { statusCode: 400, status: false, message: err.message };
  }
}

module.exports = { postComment, listComments, replyToComment, listReplies };
