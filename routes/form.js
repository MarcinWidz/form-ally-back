const express = require("express");
const router = express.Router();
const formidableMiddleware = require("express-formidable");
router.use(formidableMiddleware());

// Import of Models

const Account = require("../models/Account");
const Answer = require("../models/Answer");
const Form = require("../models/Form");
const Question = require("../models/Question");

// Import color themes

const colors = require("../colors.json");

// Import de package pour la creation du Slug:

const slugify = require("slugify");

router.get("/backoffice", async (req, res) => {});

// Route for creating a form

router.post("/backoffice/create", async (req, res) => {
  const user = await Account.find();
  const questions = await Account.find();

  // for (let i = 0; i < questions.length; i++) {
  //   if(questions[i])

  // }
  try {
    // const questions = await Question.find({ id: req.fields._id });
    // const user = await Form.find({});
    const newForm = new Form({
      title: req.fields.title,
      slug: slugify(req.fields.title, {
        replacement: "-", // replace spaces with replacement character, defaults to `                                                   -`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
      }),
      // theme: req.fields.color,
      questions: req.fields.questions,
      user: user[0],
    });
    await newForm.save();
    res.json(newForm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/form/update/answers/:id", async (req, res) => {
  try {
    const questionToUpdate = await Question.findById(req.params.id);
    questionToUpdate.answers.push(req.fields);
    await questionToUpdate.save();
    res.json(questionToUpdate);
    console.log(questionToUpdate);
  } catch (error) {
    console.log(error.response);
  }
});

module.exports = router;
