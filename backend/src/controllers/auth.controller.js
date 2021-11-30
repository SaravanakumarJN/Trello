const { User } = require("../models/User.model");
const { errorTemplate } = require("../utilities/errorTemplate");
const { encode } = require("../utilities/jwt");

const registerUser = async (req, res) => {
  let { email, name, password } = req.body;

  try {
    let existing_check = await User.findOne({ email }).lean().exec();

    if (existing_check) {
      return errorTemplate(res, 400, "User already exists");
    }

    let payload = { email, name, password };
    let new_user = await User.create(payload);
    // let { _id } = new_user;
    // let token = await encode({ _id });

    return res.status(200).json({
      error: false,
      message: "Registered Successfully",
      // token,
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await User.findOne({ email }).exec();

    if (!user) {
      return errorTemplate(res, 400, "User doesn't exists. Please register");
    }

    let password_verification = await user.verify_password(password);

    if (!password_verification) {
      return errorTemplate(res, 400, "Incorrect password");
    }

    let { _id } = user;
    let token = await encode({ _id });

    let user_details = {
      name: user.name,
      email: user.email,
    };
    return res.status(200).json({
      error: false,
      data: {
        token,
        user_details,
      },
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

module.exports = { registerUser, loginUser };
