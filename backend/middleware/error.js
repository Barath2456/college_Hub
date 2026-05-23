/**
 * Centralized Express Error Handling Middleware.
 */
function errorHandler(err, req, res, next) {
  console.error("Error Caught in Global Handler:", err);

  const statusCode = err.statusCode || res.statusCode !== 200 ? res.statusCode : 500;
  
  // Specific handler for Prisma unique constraint violations
  if (err.code === "P2002") {
    return res.status(400).json({
      success: false,
      message: "A record with this value already exists.",
      error: err.meta?.target ? `Duplicate field: ${err.meta.target.join(", ")}` : "Duplicate key error",
    });
  }

  // Specific handler for Prisma record not found
  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      message: "The requested record was not found.",
      error: err.meta?.cause || "Record not found",
    });
  }

  res.status(statusCode === 200 ? 500 : statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
}

module.exports = errorHandler;
