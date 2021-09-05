const express = require("express");
const formidableMiddleware = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(formidableMiddleware());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
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

app.all("/*", (req, res) => res.json("Page not found"));

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
