function isEmailValid(email) {
  const emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  if (!email) return false;

  if (email.length > 254) return false;

  var valid = emailRegex.test(email);
  if (!valid) return false;

  var parts = email.split("@");
  if (parts[0].length > 64) return false;

  var domainParts = parts[1].split(".");
  if (
    domainParts.some(function (part) {
      return part.length > 63;
    })
  )
    return false;

  return true;
}
function validatePassword(pw) {
  return (
    /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[^A-Za-z0-9]/.test(pw) &&
    pw.length > 4
  );
}

function validateUserBody(req) {
  try {
    const { name, email, password } = req;
    if (
      typeof name != "string" ||
      typeof email != "string" ||
      typeof password != "string"
    )
      throw new Error();

    if (!isEmailValid(email)) throw new Error();
    if (!validatePassword(password)) throw new Error();

    return true;
  } catch (err) {
    return false;
  }
}

module.exports = { validateUserBody };
