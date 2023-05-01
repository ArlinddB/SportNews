const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
