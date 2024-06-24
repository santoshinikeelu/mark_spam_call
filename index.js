const express = require("express");
const { connection } = require("./connection/connection");
const app = express();
require("dotenv").config({});
const PORT = process.env.PORT || 3000;
connection();

app.use(express.json());
const user = require("./routes/user");
const login = require("./routes/logIn");
const contact = require("./routes/contact");
const spam = require("./routes/spam");
app.get("/", (req, res) => {
  res.send("hello from home route");
});

app.use("/api/v1/user", user);
app.use("/api/v1/user", login);
app.use("/api/v1/contact", contact);
app.use("/api/v1/spam", spam);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
