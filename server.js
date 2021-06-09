require("dotenv/config"); // See the connection below for info!
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bp = require('body-parser');
const { connect } = require("mongoose");

const { DB, PORT } = require("./config");
const { success, error } = require('consola')

const passport = require('passport')


// This connects to the database. The URL etc. is hidden by using a .env file - refer to: https://www.youtube.com/watch?v=uk-iRSj1Ldg ~27minute mark.
//mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });


//Middlewares
app.use(bp.json())
app.use(cors());
app.use(express.json());
app.use(passport.initialize())


require("./middlewares/Passport")(passport);

// Allowing files saved by multer to be accessed.
app.use(express.static('public')); // You need to create a public folder for static assets (images), refer to: https://stackoverflow.com/questions/34984347/url-to-file-which-was-uploaded-with-multer

app.use("/", require("./routes/routes")); // Apparently sets the route paths to be used.

// User router Middlewares

app.use('/api/users', require("./routes/users"));


const startApp = async () => {
    try {
        //Connect with DB
        await connect(DB, {
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        success({
            message: `Successfully connected with the Database \n${DB}`,
            badge: true
        })

        //Start to listen to server PORT

        app.listen(PORT, () =>
            success({ message: `Server started on PORT ${PORT}`, badge: true })
        );
    } catch (err) {
        error({
            message: `Unable to connect with the Database \n${err}`,
            badge: true
        })
        startApp()

    }
}

startApp()
