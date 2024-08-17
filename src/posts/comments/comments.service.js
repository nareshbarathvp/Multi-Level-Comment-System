const { default: mongoose } = require("mongoose");
const CommentsSchema = require("../../../DB/models/comments.model");

async function createComment(commentObj) {
  return await CommentsSchema.create(commentObj);
}
async function viewComments(
  findObj,
  skipCount = 0,
  limitCount = 10,
  sortObj = {}
) {
  findObj.isActive = true;
  return await CommentsSchema.find(findObj)
    .sort(sortObj)
    .skip(skipCount)
    .limit(limitCount)
    .select({ replyArr: { $slice: [0, 2] } });
}
async function viewSubComments(
  parentId,
  skipCount = 0,
  limitCount = 10,
  sortObj = {}
) {
  return await CommentsSchema.aggregate([
    { $match: { _id: mongoose.Types.ObjectId.createFromHexString(parentId) } },
    { $unwind: "$replyArr" },
    { $sort: sortObj },
    {
      $project: {
        _id: 1,
        postId: 1,
        userName: 1,
        createdAt: 1,
        "replyArr.userName": 1,
        "replyArr.comment": 1,
        "replyArr.createdBy": 1,
        "replyArr.createdAt": 1,
        "replyArr._id": 1
      }
    },
    { $skip: skipCount },
    { $limit: limitCount }
  ]);
}
async function findOneComment(parentId) {
  return await CommentsSchema.findById(parentId);
}
async function subCommentAdd(parentId, commentObj) {
  commentObj._id = new mongoose.Types.ObjectId();
  const parentComment = await findOneComment(parentId);

  parentComment.replyArr.unshift(commentObj);
  parentComment.replyCount++;
  return await CommentsSchema.findByIdAndUpdate(parentId, {
    $set: {
      replyArr: parentComment.replyArr,
      replyCount: parentComment.replyCount
    }
  });
}

module.exports = {
  createComment,
  findOneComment,
  viewComments,
  viewSubComments,
  subCommentAdd
};
