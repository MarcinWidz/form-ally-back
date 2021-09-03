const mongoose = require("mongoose");
const colors = require("../colors.json");

const Form = mongoose.model("Form", {
  title: String,
  slug: String,
  theme: { type: Object, default: colors[0] },
  questions: Array,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

module.exports = Form;
