const { verifyToken } = require("../utils/jwt");

/**
 * Express middleware to guard protected routes using JWT authentication.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user payload ({ id, email }) to request
    next();
  } catch (error) {
    console.error("JWT Verification failed:", error.message);
    return res.status(401).json({
      success: false,
      message: "Token is invalid or has expired.",
    });
  }
}

module.exports = authMiddleware;
