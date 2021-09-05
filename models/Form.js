const mongoose = require("mongoose");
const colors = require("../colors.json");

const AnswersSchema = mongoose.Schema({
  form_id: String,
  question_id: String,
  body: String,
});
const QuestionsSchema = mongoose.Schema({
  body: String,
  order: Number,
  type: String,
  answers: [AnswersSchema],
});

const Form = mongoose.model("Form", {
  title: String,
  slug: String,
  theme: { type: Object, default: colors[0] },
  questions: [QuestionsSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

module.exports = Form;
