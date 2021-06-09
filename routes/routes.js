const express = require("express");
const router = express.Router();
const Instructor = require("../models/instructorModel");
const News = require("../models/newsModel");
const multer = require('multer');

// ADD INSTRUCTOR --- POST with data from the frontend's body(form). It gets it from the request.
router.route("/add").post((req, res) => {
    const name = req.body.name;
    const rank = req.body.rank;
    const img = req.body.img;
    const title = req.body.title;
    const desc = req.body.desc;
    const email = req.body.email;
    const phone = req.body.phone;
    try {
        if (name == null || name == "") throw "Name must not be empty!";
        if (rank == null || rank == "") throw "Rank must not be empty!";
    } catch (err) {
        console.log(err);
        return;
    }
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
    console.log('added');
});

// ADD NEWS --- POST with data from the frontend's body(form). It gets it from the request.
router.route("/addnews").post((req, res) => {
    const title = req.body.title;
    const text = req.body.text;
    const newArticle = new News({
        title,
        text
    });
    newArticle.save();
    console.log('added');
});

// IMAGE UPLOADING --- refer to https://www.youtube.com/watch?v=EVOFt8Its6I
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images'); // Location where the file is uploaded to.
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: fileStorage});
router.route("/test").post(upload.single('image'), (req, res) => { // 'image' = what multer searches for in the "fieldname" of the data (basically the KEY in Postman, when the file itself is the VALUE) (in frontend code: data.append('image'))
    console.log(req.file);
    res.send('Single file uploaded');
});

// UPDATE INSTRUCTOR --- based on ID.
router.route("/edit").post((req, res) => {
    const targetId = req.body.targetId;
    const name = req.body.name;
    const rank = req.body.rank;
    const title = req.body.title;
    const desc = req.body.desc;
    const email = req.body.email;
    const phone = req.body.phone;

    Instructor.findByIdAndUpdate({ _id: targetId }, { 
        name: name,
        rank: rank,
        title: title,
        desc: desc,
        email: email,
        phone: phone,
     }).then(console.log('edited')); // It seems that without this console.log the findBy... method is not completed.
});

// UPDATE PHOTO --- based on ID.
router.route("/editfoto").post((req, res) => {
    const targetId = req.body.targetId;
    const img = req.body.img;
    Instructor.findByIdAndUpdate({ _id: targetId }, { 
        img: img,
     }).then(console.log('edited foto')); // It seems that without this console.log the findBy.. method is not completed.
});

// DELETE INSTRUCTOR --- based on ID.
router.route("/remove").post((req, res) => {
    const targetId = req.body.targetId;

    Instructor.findByIdAndRemove({ _id: targetId }).then(console.log('removed')); // It seems that without this console.log the findBy.. method is not completed.
});

// GET INSTRUCTORS --- Found items get sent as a JSON response.
router.route("/instructors").get((req, res) => {
    Instructor.find()
    .then(foundInstructors => res.json(foundInstructors));
});

// GET NEWS --- Found items get sent as a JSON response.
router.route("/news").get((req, res) => {
    News.find()
    .then(foundArticles => res.json(foundArticles));
});

// GET SINGLE INSTRUCTOR INFO --- Found items get sent as a JSON response.
router.route("/info").get((req, res) => {
    const targetId = req.query; // Sets targetId to the query parameter (which is the _id for the document in the database) provided in the frontend's fetch call.
    Instructor.findById(targetId, {__v:0,_id:0}).then(foundInfo => { // The second parameter makes it so that it will not fetch/display _id & __v values. https://www.geeksforgeeks.org/mongoose-findone-function/
        let info = res.json(foundInfo);
    });
});


module.exports = router; // Without this line there will be a crash. Not sure where it is referred to.