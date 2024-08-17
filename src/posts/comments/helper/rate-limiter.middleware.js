const RATE_LIMIT = 10;
const WINDOW_SIZE = 60 * 1000;

const userRequests = new Map();

function rateLimiter(req, res, next) {
  const userId = req.data._id;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const currentTime = Date.now();
  const timestamps = userRequests.get(userId) || [];

  const windowStart = currentTime - WINDOW_SIZE;
  while (timestamps.length && timestamps[0] < windowStart) {
    timestamps.shift();
  }

  if (timestamps.length >= RATE_LIMIT) {
    return res
      .status(429)
      .json({ status: false, message: "Rate limit exceeded" });
  }

  timestamps.push(currentTime);
  userRequests.set(userId, timestamps);

  next();
}

module.exports = rateLimiter;
