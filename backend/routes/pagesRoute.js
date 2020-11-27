const express = require("express");
const router = express.Router();
const Pages = require("../models/pagesModel");

router.route("/").get((req, res) => {
  Pages.find()
    .then((data) => res.json([{ result: "success" }, { data: data }]))
    .catch((err) => res.status(400).send({ error: err }));
});

router.route("/:pageId").get((req, res) => {
  Pages.findById(req.params.pageId)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).send({ error: err }));
});

router.route("/pagedetails/:pageId").get((req, res) => {
  Pages.findById(req.params.pageId)
    .select(["pageTitle", "author", "created"])
    .then((data) => res.json(data))
    .catch((err) => res.status(400).send({ error: err }));
});

router.route("/botdetails/:pageId").get((req, res) => {
  Pages.findById(req.params.pageId)
    .select(["identifier"])
    .then((data) => res.json(data))
    .catch((err) => res.status(400).send({ error: err }));
});

router.route("/pagedetails/:pageId").post((req, res) => {
  Pages.findById(req.params.pageId).then((page) => {
    page.pageTitle = req.body.pageTitle;
    page
      .save()
      .then(() => res.json("updated"))
      .catch((err) => res.status(400).send({ error: err }));
  });
});

router.route("/botidentifier/:pageId").post((req, res) => {
  Pages.findById(req.params.pageId).then((page) => {
    page.identifier = req.body.identifier;
    page
      .save()
      .then(() => res.json("updated"))
      .catch((err) => res.status(400).send({ error: err }));
  });
});

router.route("/savescript/:pageId").post((req, res) => {
  Pages.findById(req.params.pageId).then((page) => {
    page.script = req.body.script;
    page
      .save()
      .then((data) => res.json(data))
      .catch((err) => res.status(400).send({ error: err }));
  });
});

router.route("/projectPages/:projectId").get((req, res) => {
  Pages.find({ projectId: req.params.projectId })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).send({ error: err }));
});

router.route("/:pageId").delete((req, res) => {
  Pages.findByIdAndDelete(req.params.pageId)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).send({ error: err }));
});

router.route("/add").post((req, res) => {
  let page = {};
  page.author = req.body.author;
  page.authorId = req.body.authorId;
  page.created = req.body.created;
  page.accountId = req.body.accountId;
  page.projectId = req.body.projectId;
  page.pageTitle = req.body.pageTitle;
  page.gjsassets = req.body.gjsassets;
  page.gjscomponents = req.body.gjscomponents;
  page.gjscss = req.body.gjscss;
  page.gjshtml = req.body.gjshtml;
  page.gjsstyles = req.body.gjsstyles;

  const newPage = new Pages(page);

  newPage
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).send({ error: err }));
});

router.route("/save/:pageId").post((req, res) => {
  Pages.findById(req.params.pageId).then((page) => {
    page.gjshtml = req.body.gjshtml;
    page.gjscomponents = req.body.gjscomponents;
    page.gjsassets = req.body.gjsassets;
    page.gjscss = req.body.gjscss;
    page.gjsstyles = req.body.gjsstyles;
    page
      .save()
      .then(() => res.json("updated"))
      .catch((err) => res.status(400).send({ error: err }));
  });
});

module.exports = router;
