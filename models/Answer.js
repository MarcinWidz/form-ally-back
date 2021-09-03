const mongoose = require("mongoose");

const Answer = mongoose.model("Answer", {
  form_id: String,
  question_id: String,
  body: String,
});

module.exports = Answer;
