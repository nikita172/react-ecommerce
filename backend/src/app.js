const express = require("express");
const db = require("./config/db");
const path = require("path")

// const morgan = require("morgan");

const mainRouter = require("./routes/main");
const cors = require("./middleware/cors")
// connect to database
db.connect();

// create express app
const app = express();
// app.use(morgan('dev'));

app.use(cors)
app.use("/images", express.static(path.join(__dirname,"../public/images")))
console.log(__dirname)
app.use(mainRouter);


// listen to requests
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("App is listening to port 8080 🚀");
});

