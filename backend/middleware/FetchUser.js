const jwt = require('jsonwebtoken');
const JWT_SECRATE = "secratBoy"; // Ensure this is the same secret used for signing tokens

const fetchDetails = (req, res, next) => {
  // Get the token from the header
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  try {
    // Verify token
    const data = jwt.verify(token, JWT_SECRATE);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = fetchDetails;

