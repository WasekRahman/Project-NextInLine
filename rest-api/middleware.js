const routes = require("./routes/index");
const bodyParser = require("body-parser");
process.env.TZ = "America/New York";
var cors = require("cors");
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
module.exports = [cors(corsOptions), bodyParser.json(), routes];
