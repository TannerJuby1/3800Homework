var express = require('express');
var GitHubApi = require('github');
var app = express();

app.get('/gets/', function(req, res) {

   // Set up Response
   res.set('Content-Type', 'application/html');
   var s = "<html><body>\n"

   s += "\t\tHeaders<table>";

   for (var header in req.headers) {
       s += '<tr><td>' + header + '</td><td>' + req.headers[header] + '</td></tr>'

   }

   s += "</table>"

   // Make sure the correct OAuth token was provided

   // Access Git Hub
   var github = new GitHubApi({
       // required
       version: "3.0.0"
   });

   var token = "3f4af2c6a2e8bd385d7bfe86e71431f57f31b52f";

   github.authenticate({
       type: "oauth",
       token: token
   });

   github.user.get({ user: 'tannerjuby'} , function(err, res) {
       console.log("GOT ERR?", err);
       console.log("GOT RES?", res);

       s += '<p>' + err + '</p>';
       s += '<p>' + res + '</p>';

       github.repos.getAll({}, function(err, res) {
           console.log("GOT ERR?", err);
           console.log("GOT RES?", res);

           s += '<p>' + err + '</p>';
           s += '<p>' + res + '</p>';
       });
   });

    s += "</body></html>";

    res.send(s)
})

app.listen(3000);
console.log("Server running on...")
