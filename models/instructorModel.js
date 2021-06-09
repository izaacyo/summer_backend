const mongoose = require("mongoose");

// The structure of the items' data in the database is set here, similar to 'instructor(name VARCHAR(20)...'
const instructorSchema = {
    name: {
        type: String,
        required: 'Name can not be empty'
    },
    rank: {
        type: String,
        required: 'Rank can not be empty'
    },
    img: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    desc: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    }
}

// The schema is used to create a constructor, called a model, for all the documents(items) in the database. 
const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;