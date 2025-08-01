const errorHandler = (err, req, res, next) => {
  const message = err.message || "Something went wrong";

  res.status(500).json({ message, success: false });
};

module.exports = { errorHandler };
