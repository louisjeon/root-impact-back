const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
    format: /^\d{4}\/\d{2}\/\d{2}$/,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
  },
  skillSet: {
    type: [String],
    required: true,
  },
  resumes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },
  ],
  appliedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPost",
    },
  ],
  token: {
    type: String,
  },
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  if (plainPassword === this.password) {
    cb(null, true);
  } else {
    cb(null, false);
  }
  return cb({ error: "error" });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
