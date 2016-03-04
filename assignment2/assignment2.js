/**
 * Created by TannerJuby on 2/18/16.
 */

 var express = require('express');
 var app = express();

 app.get('/gets/', function(req, res) {

     res.set('Content-Type', 'application/html');
     var s = "<html><body>\n"

     s += "\t\tHeaders<table>";

     for (var header in req.headers) {
      s += '<tr><td>' + header + '</td><td>' + req.headers[header] + '</td></tr>'

     }
     s += "</table></body></html>";

     res.send(s)
 })

 app.post('/posts/user', function(req, res) {

     res.set('Content-Type', 'application/html');
     var s = "<html><body>\n"

     s += "\t\tHeaders<table>";

     for (var header in req.headers) {
      s += '<tr><td>' + header + '</td><td>' + req.headers[header] + '</td></tr>'

     }

     s += "</table>\n"

     s += "\t\tParameters<table>";

     if (req.param('name') === undefined ) {
         s += '<tr><td>' + 'ERROR: No name was provided.' + '</td></tr>'
     }
     else {
         var name = req.param('name');
         s += '<tr><td>' + 'Name: ' + name + '</td></tr>'
     }

     if (req.param('email') === undefined) {
         s += '<tr><td>' + 'ERROR: No email was provided.' + '</td></tr>'
     }
     else {
         var email = req.param('email');
         s += '<tr><td>' + 'Email: ' + email + '</td></tr>'
     }

     s += "</table></body></html>";

     res.send(s)

 })

 app.put('/puts/user', function(req, res) {

     res.set('Content-Type', 'application/html');
     var s = "<html><body>\n"

     s += "\t\tHeaders<table>";

     for (var header in req.headers) {
      s += '<tr><td>' + header + '</td><td>' + req.headers[header] + '</td></tr>'

     }

     s += "</table>\n"

     s+= "\t\tParameters<table>";

     if (req.param('name') === undefined ) {
         s += '<tr><td>' + 'ERROR: No name was provided.' + '</td></tr>'
     }
     else {
         var name = req.param('name');
         s += '<tr><td>' + 'Name: ' + name + '</td></tr>'
     }

     if (req.param('email') === undefined) {
         s += '<tr><td>' + 'ERROR: No email was provided.' + '</td></tr>'
     }
     else {
         var email = req.param('email');
         s += '<tr><td>' + 'Email: ' + email + '</td></tr>'
     }

     s += "</table></body></html>";

     res.send(s)

 })

 app.delete('/deletes', function(req, res) {

     res.set('Content-Type', 'application/html');
     var s = "<html><body>\n"

     s += "\t\tHeaders<table>";

     for (var header in req.headers) {
      s += '<tr><td>' + header + '</td><td>' + req.headers[header] + '</td></tr>'

     }
     s += "</table></body></html>";

     res.send(s)

 })

 app.listen("tannerjuby-test.apigee.net/assignment2");
 console.log("Server running on...")
