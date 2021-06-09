const express = require("express");
const app = express();
const cors = require("cors");
const bp = require('body-parser');
const { connect } = require("mongoose");
const { DB, PORT } = require("./config"); // Hides database connection info using config/index.js and .env files.
const { success, error } = require('consola');
const passport = require('passport');

//Middlewares
app.use(bp.json());
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

require("./middlewares/Passport")(passport);

// Allowing files saved by multer to be accessed, refer to: https://stackoverflow.com/questions/34984347/url-to-file-which-was-uploaded-with-multer
app.use(express.static('public'));

app.use("/", require("./routes/routes")); // Sets the route paths to be used [instead of doing app.use("/add", ..) which is also possible.]

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
