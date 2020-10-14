const mongoose = require("mongoose");
require("dotenv/config");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Database connected successfully");
});
