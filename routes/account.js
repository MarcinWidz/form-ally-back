const express = require("express");
const router = express.Router();

// Import of models:
const Account = require("../models/Account");
const Answer = require("../models/Answer");
const Form = require("../models/Form");
const { findById } = require("../models/Question");
const Question = require("../models/Question");
const { route } = require("./question");

router.post("/account", async (req, res) => {
  const forms = await Form.find();

  const newAccount = new Account({
    password: req.fields.password,
  });
  await newAccount.save();
  res.json(newAccount);
});

router.get("/backoffice", async (req, res) => {
  try {
    const forms = await Form.find();
    res.json(forms);
    console.log(forms);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/account/login", async (req, res) => {
  const account = await Account.find();
  res.json(account);
});

router.get("/form/slug", (req, res) => {
  res.json({ message: "Respond to a Form" });
});

module.exports = router;
