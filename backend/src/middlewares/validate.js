const Joi = require("joi");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");



const validates = (schema) => (req, res, next) => {
  // Request body should be JSON
  if (Object.keys(req.body).length !== 0 && !req.is("application/json")) {
    return next(
      new ApiError(
        httpStatus.UNSUPPORTED_MEDIA_TYPE,
        "Supports JSON request body only"
      )
    );
  }

  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);
  //throw 400 
  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};



module.exports = validates;