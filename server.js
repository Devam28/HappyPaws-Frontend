const express = require('express');
const path = require('path');

const port = process.env.PORT || 8082;
const app = express();

// serve only the static files form the build directory
app.use(express.static(__dirname + '/frontend/build/'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});


app.listen(port);
console.log("Listening at port " + port );