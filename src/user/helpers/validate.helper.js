function validateUserBody(req) {
  try {
    const { name, email, password } = req;
    if (
      typeof name != "string" ||
      typeof email != "string" ||
      typeof password != "string"
    )
      throw new Error();

    return true;
  } catch (err) {
    return false;
  }
}
