const express = require("express");
const router = express.Router();
const Instructor = require("../models/instructorModel");
const News = require("../models/newsModel");

// The path makes a POST with data from the frontend's body(form). It gets it from the request.
router.route("/add").post((req, res) => {
    const name = req.body.name;
    const rank = req.body.rank;
    const img = req.body.img;
    const title = req.body.title;
    const desc = req.body.desc;
    const newInstructor = new Instructor({
        name,
        rank,
        img,
        title,
        desc
    });
    newInstructor.save();
});

router.route("/addnews").post((req, res) => {
    const title = req.body.title;
    const text = req.body.text;
    const newArticle = new News({
        title,
        text
    });
    newArticle.save();
});

router.route("/edit").post((req, res) => {
    const targetType = req.body.targetType;

    Instructor.findByIdAndUpdate({ _id: "60b8b54091dba74248b05708" }, { 
        desc: "freshest document in the wuuuhld"
     }).then(console.log('done edit'));
});

// The path makes a GET, and the found items get sent as a JSON response.
router.route("/instructors").get((req, res) => {
    Instructor.find()
    .then(foundInstructors => res.json(foundInstructors));
});

router.route("/news").get((req, res) => {
    News.find()
    .then(foundArticles => res.json(foundArticles));
});

module.exports = router; // Without this line there will be a crash. Not sure where it is referred to.