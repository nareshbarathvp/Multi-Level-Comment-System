const { valdatePostBody } = require("./helpers/validate.helper.");
const { viewAllPosts, createPost, viewPostbyId } = require("./post.service");

async function postPost(req) {
  try {
    if (!valdatePostBody(req.body)) throw new Error("Incorrect request body");
    const { title, content } = req.body;
    await createPost({
      title,
      content,
      name: req.data.name,
      createdBy: req.data._id
    });

    return {
      statusCode: 200,
      status: true,
      message: "Post created successfully"
    };
  } catch (err) {
    return { statusCode: 400, status: false, message: err.message };
  }
}
async function viewPost() {
  try {
    const data = await viewAllPosts();
    return { statusCode: 200, status: true, message: "Data found", data };
  } catch (err) {
    return { statusCode: 400, status: false, message: err.message };
  }
}
async function editPost(req) {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;
    const checkPost = await viewPostbyId(postId);
    if (!checkPost) throw new Error("Post not found");

    if (title) checkPost.title = title;
    if (content) checkPost.content = content;
    await checkPost.save();

    return {
      statusCode: 200,
      status: true,
      message: "Post updated successfully"
    };
  } catch (err) {
    return { statusCode: 400, status: false, message: err.message };
  }
}
async function deletePost(req) {
  try {
    const { postId } = req.params;
    const checkPost = await viewPostbyId(postId);
    if (!checkPost) throw new Error("Post not found");

    checkPost.isActive = false;
    await checkPost.save();

    return {
      statusCode: 200,
      status: true,
      message: "Post deleted successfully"
    };
  } catch (err) {
    return { statusCode: 400, status: false, message: err.message };
  }
}

module.exports = { postPost, viewPost, editPost, deletePost };
