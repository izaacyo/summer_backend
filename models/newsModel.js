const mongoose = require("mongoose");

// The structure of the items' data in the database is set here, similar to 'instructor(name VARCHAR(20)...'
const newsSchema = {
    title: {
        type: String,
        required: 'Title can not be empty'
    },
    text: {
        type: String,
        required: 'Text can not be empty'
    }
}

// The schema is used to create a constructor, called a model, for all the documents(items) in the database. 
const News = mongoose.model("Article", newsSchema);
module.exports = News;