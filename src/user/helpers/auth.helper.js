const jwt = require("jsonwebtoken");
const privateKey = process.env.privateKey || "Test@1234";

function generateJWT(tokenObj) {
  return jwt.sign(tokenObj, privateKey, { expiresIn: "24h" });
}
function verifyToken(req, res, next) {
  try {
    const authToken = req.headers.authorization.split(" ")[1];
    const privateKey = process.env.privateKey || "Test@1234";
    const data = jwt.verify(authToken, privateKey);
    if (!data) throw new Error();

    req.data = data;
    next();
  } catch (err) {
    res.status(401).json({ status: false, message: "Unauthorised" });
  }
}
module.exports = { generateJWT, verifyToken };
