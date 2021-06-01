require("dotenv/config"); // See the connection below for info.
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());


// This connects to the database. The URL etc. is hidden by using a .env file - refer to: https://www.youtube.com/watch?v=uk-iRSj1Ldg ~27minute mark.
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/", require("./routes/routes")); // Apparently sets the route paths to be used.


app.listen(3001, function () {
    console.log("Express server running on port 3001");
}) // If a connection is 'heard' then console logs this message.