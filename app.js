var express = require("express");
var app = express();
var port = 3000;
 
app.get("/", (req, res) => {  /* app.use equivalent ? */
 res.send("Hello World");
});
 
app.listen(port, () => {
 console.log("Server listening on http://localhost:" + port);
});
