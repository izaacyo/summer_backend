require("dotenv/config"); // See the connection below for info!
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());


// This connects to the database. The URL etc. is hidden by using a .env file - refer to: https://www.youtube.com/watch?v=uk-iRSj1Ldg ~27minute mark.
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/", require("./routes/routes")); // Apparently sets the route paths to be used.


app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
}) // If a connection is 'heard' then console logs this message.