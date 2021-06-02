const mongoose = require("mongoose");

// The structure of the items' data in the database is set here, similar to 'instructor(name VARCHAR(20)...'
const instructorSchema = {
    name: String,
    rank: String,
    img: String,
    title: String,
    desc: String
}

// The schema is used to create a constructor, called a model, for all the documents(items) in the database. 
const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;