// var http = require('http');

// http.createServer(function(req, res) {
//     res.write("Hello");
//     res.end();
// }).listen(8000);

const express = require('express');
const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the correct route and ensure you are importing a router
app.use('/api/users/', require('./Routes/api/users'));

app.listen(4000, () => {
    console.log("Server is Started 4000");
});
