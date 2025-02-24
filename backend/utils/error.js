export const createError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

// Centralized Error Handling Middleware
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
