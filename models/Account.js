const mongoose = require("mongoose");

const Account = mongoose.model("Account", {
  password: String,
  forms: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
  },
});

module.exports = Account;
