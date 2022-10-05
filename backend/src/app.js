const express = require("express");
const db = require("./config/db");
const path = require("path")
const mainRouter = require("./routes/main");
const cors = require("./middleware/cors")

db.connect();
const app = express();
app.use(cors)
app.use("/public", express.static(path.join(__dirname, "../public")))
console.log(__dirname)
app.use(mainRouter);
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("App is listening to port 8080 🚀");
});

