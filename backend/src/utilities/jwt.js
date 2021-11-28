const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const sceret_key = process.env.JWT_SECRET_KEY;
const encode = async (to_encode) => {
  let token = await jwt.sign(to_encode, sceret_key);
  return token;
};

const decode = async (to_decode) => {
  let details = await jwt.verify(to_decode, sceret_key);
  return details;
};

module.exports = {
  decode,
  encode,
};
