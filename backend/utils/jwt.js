const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretcollegehubkey_123456789";

/**
 * Generates a JWT token for a user payload.
 * @param {object} payload - The user data to sign (typically { id, email })
 * @returns {string} - The signed JWT token
 */
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

/**
 * Verifies a JWT token.
 * @param {string} token - The JWT token to verify
 * @returns {object} - The decoded payload
 */
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  generateToken,
  verifyToken,
};
