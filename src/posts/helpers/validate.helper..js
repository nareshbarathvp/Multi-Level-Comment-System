function valdatePostBody(req) {
  try {
    const { title, content } = req;
    if (typeof title != "string" || typeof content != "string")
      throw new Error();

    return true;
  } catch (err) {
    return false;
  }
}

module.exports = { valdatePostBody };
