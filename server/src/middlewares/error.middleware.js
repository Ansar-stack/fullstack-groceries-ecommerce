export const ErrorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Something went wrong";

  // Log the error stack in dev mode
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
    // stack only in dev for debugging
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};