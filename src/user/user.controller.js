const UserSchema = require("../../DB/models/user");
async function userRegister(req) {
  try {
    return {
      statusCode: 200,
      status: true,
      message: "User registered successfully"
    };
  } catch (err) {
    return { statusCode: 400, status: false, message: err.message };
  }
}
module.exports = { userRegister };
