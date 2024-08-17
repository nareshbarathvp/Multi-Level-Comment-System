const UserSchema = require("../../DB/models/user.model");

async function getUserbyEmail(email) {
  return await UserSchema.findOne({ email }).lean();
}
async function createUser(userObj) {
  return await UserSchema.create(userObj);
}
async function getUserbyId(_id) {
  return await UserSchema.findById(_id).select([
    "-_id",
    "-password",
    "-createdAt"
  ]);
}

module.exports = { getUserbyEmail, createUser, getUserbyId };
