const mongoose = require("mongoose");

const instructor = mongoose.createConnection(process.env.DB_CONNECTION)

// The schema is used to create a constructor, called a model, for all the documents(items) in the database. 

instructor.model('Instructors', require('./instructorSchema'))

module.exports = instructor