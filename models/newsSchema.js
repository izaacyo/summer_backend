const { Schema } = require("mongoose");

const newsSchema = new Schema({
    title: String,
    text: String
});

module.exports = newsSchema