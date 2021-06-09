require("dotenv").config();

module.exports = {
    DB: process.env.DB_CONNECTION,
    SECRET: process.env.APP_SECRET,
    PORT: process.env.APP_PORT
}