const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 8,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = bcrypt.genSaltSync(10);
  const hashed_password = bcrypt.hashSync(this.password, salt);
  this.password = hashed_password;
  return next();
});

userSchema.methods.verify_password = function (password) {
  const hashed_password = this.password;

  return bcrypt.compareSync(password, hashed_password);
};

const User = mongoose.model("user", userSchema);

module.exports = { User };
