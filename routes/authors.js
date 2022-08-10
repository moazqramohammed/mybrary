const express = require("express");
const router = express.Router();
const Author = require("../models/author");
// ALL AUTHORS
router.get("/", async (req, res) => {
      let searchOptions = {};
      if (req.query.name != null && req.query.name != "")
            searchOptions.name = new RegExp(req.query.name, "i");
      try {
            const authors = await Author.find(searchOptions);
            res.render("authors/index", { authors, searchOptions: req.query });
      } catch {
            res.redirect("/");
      }
});

// New auther rout
router.get("/new", (req, res) => {
      res.render("authors/new", { author: new Author() });
});

// Create Author
router.post("/", async (req, res) => {
      const author = new Author({ name: req.body.name });
      try {
            const newMessage = await author.save();
            // res.redirect(`authors/${newAuthor._id}`);
            res.redirect(`authors`);
      } catch (error) {
            res.render("authors/new", {
                  author: author,
                  errorMessage: "Error Creating Author",
            });
      }
});

module.exports = router;
