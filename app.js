const express = require("express");
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const name_db = "node-demo_db";
const port_db = "27017";
mongoose.connect("mongodb://localhost:" + port_db + "/" + name_db, { useNewUrlParser: true });

mongoose.Promise = global.Promise;

const nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
},{
    collection : 'user_c'
});

const User = mongoose.model("User", nameSchema); /* mongoose document - database */

/* display form page */
app.get("/", (req, res) => {
    const fullNameOfFile = __dirname + "/index.html";
    console.log ('app.get file full path is', fullNameOfFile);
    res.sendFile(fullNameOfFile);
});

/* get firstName and lastName from form as req.body */
/* save them in database with res.send              */
/* <form method="post" action="/addname">           */
app.post("/addname", (req, res) => {
    console.log('app.post route is', req.route);
    const myData = new User(req.body);
    myData.save()
	.then(item => {
	    res.send("<h3>Data saved to database <i>"+name_db+"</i></h3>");
	})
	.catch(err => {
	    console.log('app.post save error is', err);
	    res.status(400).send("unable to save to database");
	});
});

app.listen(port, () => {
    console.log("Server listening on http://localhost:" + port);
});

