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

router.delete("/backoffice/delete/:id", async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json("deleted");
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/backoffice/delete-all/", async (req, res) => {
  try {
    console.log("REQ FIELDS:", req.fields.questionsData);
    for (let i = 0; i < req.fields.questionsData.length; i++) {
      console.log("req.fields[i]", req.fields.questionsData[i]._id);
      await Question.findByIdAndDelete(req.fields.questionsData[i]._id);
    }

    res.json("deleted");
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/backoffice/up/:id", async (req, res) => {
  try {
    const all = await Question.find();
    const question = await Question.findById(req.params.id);
    // console.log(all);
    res.json(question);
  } catch (error) {
    console.log(error.message);
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
