const express = require("express");
const app = express();
const routes = require("./routes/index");
const connection = require("./database/connection");
app.use(routes);

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
