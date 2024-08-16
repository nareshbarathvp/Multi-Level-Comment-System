const bcrypt = require("bcrypt");
const { validateUserBody } = require("./helpers/validate.helper");
const { getUserbyEmail, createUser, getUserbyId } = require("./user.service");
const { generateJWT } = require("./helpers/auth.helper");

async function userRegister(req) {
  try {
    if (!validateUserBody(req.body)) throw new Error("Incorrect request body");
    const { name, email, password } = req.body;

    const duplicateCheck = await getUserbyEmail(email);
    if (duplicateCheck) throw new Error("Email already exist");

    const hash = await bcrypt.hash(password, 10);
    await createUser({ email, password: hash, name });

    return {
      statusCode: 200,
      status: true,
      message: "User registered successfully"
    };
  } catch (err) {
    return { statusCode: 400, status: false, message: err.message };
  }
}
async function userLogin(req) {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Incorrect request body");

    const userCheck = await getUserbyEmail(email);
    if (!userCheck) throw new Error("Incorrect email");
    if (!(await bcrypt.compare(password, userCheck.password)))
      throw new Error("Incorrect password");

    delete userCheck.password;
    const token = generateJWT(userCheck);
    return {
      statusCode: 200,
      status: true,
      message: "Login successful",
      token
    };
  } catch (err) {
    return { statusCode: 400, status: false, message: err.message };
  }
}
async function getUser(id) {
  try {
    const data = await getUserbyId(id);
    return { statusCode: 200, status: true, message: "Data found", data };
  } catch (err) {
    return { statusCode: 400, status: false, message: err.message };
  }
}
module.exports = { userRegister, userLogin, getUser };
