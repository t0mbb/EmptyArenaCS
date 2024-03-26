export const handleError =  (error, _req, res, _next) => {
  const statusCode = error.status || error.statusCode || 500;

  return res.status(statusCode).json({
    status: false,
    message: error || error.message || "Server error.",
  });
};

export const handleNotFound = (req, res) => res.status(404).json({
  status: false,
  message: "API resource not found.",
});