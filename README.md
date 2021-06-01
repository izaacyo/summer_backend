## Installed packages

mongoose, express, cors, dotenv

Mongoose is used to model MongoDB objects in node.js.

Express is a minimal and flexible node.js web application framework that provides a robust set of features for web and mobile applications.

CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options (Cross-Origin Resource Sharing).

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env (you can use it to hide passwords etc.) You must create a ".env" file in the root (where .gitignore, README.md etc. are) and inside that define:

DB_CONNECTION = "(url goes here)"
