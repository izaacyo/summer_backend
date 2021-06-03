const { Schema } = require("mongoose");

const instructorSchema = new Schema({
    name: String,
    rank: String,
    img: String,
    title: String,
    desc: String
})

module.exports = instructorSchema;