const express = require("express");
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set ('view engine', 'ejs');

const port_server = 3000;

app.get ('/', (req, res) => {
    res.render ('pages/index');
});

app.get('/Un-lecteur', function(req, res) {
    res.render ('pages/un-lecteur-post');
});

app.post('/Un-lecteur-post', function(req, res) {
    const pseudo = req.body.pseudoLecteur;
    console.log('Le pseudo est ' + pseudo + '!');
});
	    
app.listen(port_server, () => {
    console.log("Server listening on port http://localhost:" + port_server);
});
