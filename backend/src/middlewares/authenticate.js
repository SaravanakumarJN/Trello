const { decode } = require("../utilities/jwt");
const { errorTemplate } = require("../utilities/errorTemplate");

const authenticate = async (req, res, next) => {
  try {
    let { headers } = req;
    let bearer_token = headers.authorization;

    if (!bearer_token || !bearer_token.startsWith("Bearer")) {
      return errorTemplate(res, 400, "Bearer token invalid");
    }

    const token = bearer_token.trim().split(" ")[1];

    let decoded_details;
    try {
      decoded_details = await decode(token);
    } catch (error) {
      return errorTemplate(res, 400, "Invalid user credential");
    }

    req.user_id = decoded_details._id;
    next();
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

module.exports = { authenticate };
