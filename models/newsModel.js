const mongoose = require("mongoose");



const News = mongoose.createConnection(process.env.DB_CONNECTION)
News.model('Article', require('./newsSchema'))



module.exports = News;