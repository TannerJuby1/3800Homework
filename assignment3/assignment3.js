var express = require('express');
var GitHubApi = require('github');
var app = express();

app.get('/gets/', function(req, res) {

    // Set up Response
    res.set('Content-Type', 'application/html');
    var s = "<html><body>\n"

    s += "<table>"

    githubUserPresent = false
    githubTokenPresent = false

    githubUser = ''
    githubToken = ''

    if (req.param('github_user') === undefined) {
        s += '<tr><td>' + "ERROR: No Github Username Provided" + '</td></tr>'
    }
    else {
        githubUser = req.param('github_user')
        githubUserPresent = true
    }

    if (req.param('github_token') === undefined) {
        s += '<tr><td>' + "ERROR: No Github Token Provided" + '</td></tr>'
    }
    else {
        githubToken = req.param('github_token')
        githubTokenPresent = true
    }



    // Make sure the correct OAuth token was provided
    if (githubUserPresent === true && githubTokenPresent === true) {

        // Access Git Hub
        var github = new GitHubApi({
            // required
            version: "3.0.0"
        });

        github.authenticate({
            type: "oauth",
            token: githubToken
        });

        github.user.get({ user: githubUser} , function(error1, response1) {
            console.log("GOT ERR?", error1);
            console.log("GOT RES?", response1);

            if (error1 === null) {
                s += '<tr><td>' + JSON.stringify(response1) + '</td></tr>';
            }
            else {
                s += '<tr><td>' + JSON.stringify(error1) + '</td></tr>';
            }

            github.repos.getAll({}, function(error2, response2) {
                console.log("GOT ERR?", error2);
                console.log("GOT RES?", response2);

                if (error2 === null) {
                    s += '<tr><td>' + JSON.stringify(response2) + '</td></tr>';
                }
                else {
                    s += '<tr><td>' + JSON.stringify(error2) + '</td></tr>';
                }

                s += "</table>"
                s += "</body></html>";

                res.send(s)
            });
        });

    }
    else {

        s += "</table>"
        s += "</body></html>";

        res.send(s)
    }

})

app.listen("tannerjuby-test.apigee.net/assignment3/");
console.log("Server running on...")
