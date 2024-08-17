const PostSchema = require("../../DB/models/post.model");

async function createPost(postObj) {
  return await PostSchema.create(postObj);
}
async function viewAllPosts() {
  return await PostSchema.find({ isActive: true }).lean();
}
async function viewPostbyId(Id) {
  return await PostSchema.findOne({ _id: Id, isActive: true });
}

module.exports = { createPost, viewAllPosts, viewPostbyId };
