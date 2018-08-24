const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require("./routes/api/users");
const events = require("./routes/api/events");

const app = express();

app.use("/api/users", users);
app.use("/api/events", events);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => console.log("Connected to mongo"))
    .catch(err => console.log(err));


app.get("/", (req, res) => res.send("Hello World!!??"));
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
