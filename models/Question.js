const mongoose = require("mongoose");

const Question = mongoose.model("Question", {
  body: String,
  order: Number,
  type: String,
  answers: Array,
  // answers: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Answers",
  // },
});

module.exports = Question;
