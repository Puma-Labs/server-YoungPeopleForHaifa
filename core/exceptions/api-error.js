const e = require("express");
module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, "User not authorized");
  }

  static BedRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static accessDenied() {
    return new ApiError(403, "Oops! Something went wrong");
  }

  static error(error, req, res, next) {
    const customError = !(
      error.constructor.name === "NodeError" ||
      error.constructor.name === "SyntaxError"
    );
    res.status(error.statusCode || 500).json({
      status: "error",
      error: {
        type: customError === false ? "UnhandledError" : error.constructor.name,
        path: req.path,
        statusCode: error.statusCode || 500,
        message: error.message,
        stack: error.stack,
      },
    });
    next(error);
  }

  static notFound(req, res, next) {
    res.status(404);
    res.json({ status: "error", error: "not found api" });
    next();
  }
};
