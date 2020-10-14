const routes = require("./routes/index");
const bodyParser = require("body-parser");

module.exports = [bodyParser.json(), routes];
