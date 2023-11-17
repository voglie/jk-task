const successResponse = (req, res, message, code = 200, data) =>
  res.send({
    code,
    message,
    success: true,
    data,
  });

const errorResponse = (
  req,
  res,
  errorMessage = "Something went wrong",
  code = 500,
  error = {}
) =>
  res.status(code).json({
    code,
    errorMessage,
    error,
    data: null,
    success: false,
  });

module.exports = { successResponse, errorResponse };
