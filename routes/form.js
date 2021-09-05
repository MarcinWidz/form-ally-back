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

  try {
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
    const FormToUpdate = await Form.findById(req.params.id);
    console.log("BEFORE UPDATE:", FormToUpdate);
    console.log("REQ FIELDS:", req.fields);
    for (let i = 0; i < FormToUpdate.questions.length; i++) {
      if (FormToUpdate.questions[i]._id === req.fields.question_id) {
        FormToUpdate.questions[i].answers.push(req.fields);
      }
    }
    await FormToUpdate.save();
    res.json(FormToUpdate);
    console.log("AFTER UPDATE:", FormToUpdate);
  } catch (error) {
    console.log(error.response);
  }
});

router.get("/backoffice/get-form-to-update/:id", async (req, res) => {
  try {
    const getForm = await Form.findById(req.params.id);
    console.log("getForm:", getForm);
    res.json(getForm);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/backoffice/backoffice/update-form/:id", async (req, res) => {
  try {
    const updateForm = await Form.findByIdAndUpdate(req.params.id, req.fields);
    res.json(updateForm);
    console.log("REQ FIELDS:", req.fields);
    console.log("RES", updateForm);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
