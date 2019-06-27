const express = require("express");
const mongoose = require('mongoose');

var app = express();
var port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/node-demo", { useNewUrlParser: true });

const nameSchema = new mongoose.Schema({
    firstName: String,
    lastNameName: String
});

const User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
 res.sendFile(__dirname + "/index.html");
});
 
app.post("/addname", (req, res) => {
    const myData = new User(req.body);
    myData.save()
	.then(item => {
	    res.send("item saved to database");
	})
	.catch(err => {
	    res.status(400).send("unable to save to database");
	});
});

app.listen(port, () => {
 console.log("Server listening on http://localhost:" + port);
});

