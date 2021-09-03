const express = require("express");
const formidableMiddleware = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(formidableMiddleware());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/tell-me-more", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes import

const account = require("./routes/account");
app.use(account);
const answers = require("./routes/answer");
app.use(answers);
const form = require("./routes/form");
app.use(form);
const questions = require("./routes/question");
app.use(questions);

app.listen(3000, () => {
  console.log("Server has started");
});
