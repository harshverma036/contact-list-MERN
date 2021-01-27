const express = require("express");
const Port = 5000 || process.env.PORT;
const db = require("./db");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

mongoose
  .connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected..."))
  .catch((err) => console.log(`Database Error: ${err}`));

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/contact-routes"));

// if in productioncd ..
if (process.env.NODE_ENV === "production") {
  // serve static files
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(Port, () => console.log(`Server is running on PORT: ${Port}`));
