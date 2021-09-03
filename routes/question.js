const express = require("express");
const formidableMiddleware = require("express-formidable");
const router = express.Router();
router.use(formidableMiddleware());

const Account = require("../models/Account");
const Answer = require("../models/Answer");
const Form = require("../models/Form");
const Question = require("../models/Question");

router.post("/backoffice/create/questions", async (req, res) => {
  try {
    const newQuestion = new Question({
      body: req.fields.body,
      order: req.fields.order,
      type: req.fields.type,
    });
    await newQuestion.save();
    res.json(newQuestion);
    res.json("RESPONSE:", newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/backoffice/get/questions/", async (req, res) => {
  try {
    const questions = await Question.find();

    // On retourne les documents trouvés :
    res.json(questions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
