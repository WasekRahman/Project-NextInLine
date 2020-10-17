const express = require("express");
const app = express();
const connection = require("./database/connection");
middleware = require("./middleware.js");
app.use(middleware);
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
