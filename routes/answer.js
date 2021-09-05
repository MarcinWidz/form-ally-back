const express = require("express");
const router = express.Router();

const Account = require("../models/Account");
const Answer = require("../models/Answer");
const Form = require("../models/Form");
const Question = require("../models/Question");

router.post("/backoffice/form/answers", async (req, res) => {
  // const answers = await Answer.find({ id: req.fields._id });

  res.json(newQuestion);
});

router.post("/form/send/", async (req, res) => {
  console.log("req.fields:", req.fields);

  try {
    const newAnswer = new Answer({
      form_id: req.fields.form_id,
      question_id: req.fields.question_id,
      body: req.fields.body,
      uuid: req.fields.uuid,
    });
    await newAnswer.save();
    res.json(newAnswer);
  } catch (error) {
    res.json(error.message);
  }
});

router.post("/form/restart", async (req, res) => {
  try {
    for (let i = 0; i < req.fields.ids.length; i++) {
      const answersToDelete = await Answer.findByIdAndDelete(req.fields.ids[i]);
    }
    res.json("Deleted succesfully");
  } catch (error) {
    res.json(error.message);
  }
});

router.get("/form/get/answers/:id", async (req, res) => {
  const form = await Form.find({ _id: req.params.id });
  const answers = await Answer.find({ form_id: req.params.id });
  console.log("ANSWERS", form);
  console.log("ANSWERS", answers);
  res.json({ form: form, answers: answers });
});

module.exports = router;
