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
    const email = req.body.email;
    const phone = req.body.phone;
    const newInstructor = new Instructor({
        name,
        rank,
        img,
        title,
        desc,
        email,
        phone
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

// Updates based on ID.
router.route("/edit").post((req, res) => {
    const targetId = req.body.targetId;
    const name = req.body.name;
    const rank = req.body.rank;
    const img = req.body.img;
    const title = req.body.title;
    const desc = req.body.desc;
    const email = req.body.email;
    const phone = req.body.phone;

    Instructor.findByIdAndUpdate({ _id: targetId }, { 
        name: name,
        rank: rank,
        img: img,
        title: title,
        desc: desc,
        email: email,
        phone: phone,
     }).then(console.log('edited')); // It seems that without this console.log the findBy.. method is not completed.
});

// Deletes based on ID.
router.route("/remove").post((req, res) => {
    const targetId = req.body.targetId;

    Instructor.findByIdAndRemove({ _id: targetId }).then(console.log('removed')); // It seems that without this console.log the findBy.. method is not completed.
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