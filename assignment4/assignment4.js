var express = require('express');
var usergrid = require('usergrid');

var app = express();
app.use(express.bodyParser());

var client = new usergrid.client({
	'orgName' : 'tannerjuby',
	'appName' : 'sandbox',
	'clientId' : 'b3U6x-7NCtZyEeWeUReYVs_6rw',
	'clientSecret' : 'b3U6xDyDWr6qr4gUu5n_gwOD-E6S-W4',
});

/**
 *
 * Get all movies
 *
*/
app.get('/movies_all', function(req, res) {

    var options = {
		type : "movies", //Required - the type of collection to be retrieved
		client : client //Required
    };

    var movies = new usergrid.collection(options);

    movies.fetch(function (error, result) {
		if (error) {

			res.jsonp(500, {
				'error' : JSON.stringify(err)
			});
			return;

		} else {

		    res.jsonp(result);

		}
	});
})

/**
 *
 * Get movie by Title
 *
*/
app.get('/movies_by_title', function(req, res) {

    if (req.param('title') === undefined) {
        res.jsonp(500, {
			'error' : "No Movie title was provided"
		});
    }
    else {

        userSearch = req.param('title');

        userType = "movies?ql=select * where title contains '" + userSearch + "'";

        var options = {
            type : userType,
            client : client,
        };

        var movies = new usergrid.collection(options);

        movies.fetch(function (error, result) {
		    if (error) {
		    	res.jsonp(500, {
		    		'error' : JSON.stringify(err)
		    	});
	    	}
	    	else {
		        res.jsonp(result);
	    	}
    	});
    }
})

// /**
//  *
//  * Get movie by Actor -- DOES NOT WORK
//  *
// */
app.get('/movies_by_actor', function(req, res) {

    if (req.param('actor') === undefined) {
        res.jsonp(500, {
			'error' : "No actor was provided"
		});
    }
    else {

        userSearch = req.param('actor');

        userType = "movies?ql=select * where actors contains '" + userSearch + "'";

        var options = {
            type : userType,
            client : client,
        };

        var movies = new usergrid.collection(options);

        movies.fetch(function (error, result) {
		    if (error) {
		    	res.jsonp(500, {
		    		'error' : JSON.stringify(err)
		    	});
	    	}
	    	else {
		        res.jsonp(result);
	    	}
    	});
    }
})


/**
 *
 * Get movie by Year
 *
*/
app.get('/movies_by_year', function(req, res) {

    if (req.param('year') === undefined) {
        res.jsonp(500, {
			'error' : "No year was provided"
		});
    }
    else {

        userSearch = req.param('year');

        userType = "movies?ql=select * where year = '" + userSearch + "'";

        var options = {
            type : userType,
            client : client,
        };

        var movies = new usergrid.collection(options);

        movies.fetch(function (error, result) {
		    if (error) {
		    	res.jsonp(500, {
		    		'error' : JSON.stringify(err)
		    	});
	    	}
	    	else {
		        res.jsonp(result);
	    	}
    	});
    }
})


/**
 *
 * Add a new movie
 *
*/
app.post('/movie_add', function(req, res) {

    if (req.param('title') === undefined) {
        res.jsonp(500, {
			'error' : "No title was provided"
		});
    }
    else {
        if (req.param('actor1') === undefined && req.param('actor2') === undefined && req.param('actor3') === undefined) {
            res.jsonp(500, {
			'error' : "You need to have 3 actors: 'actor1', 'actor2', and 'actor3'"
		});
        }
		else {
		    if (req.param('year') === undefined) {
                res.jsonp(500, {
			    'error' : "No year was provided"
		    });
            }
            else {

                newTitle = req.param('title')
                newActors = [req.param('actor1'), req.param('actor2'), req.param('actor3')]
                newYear = req.param('year');

                var properties = {
                    type : "movies",
                    title : newTitle,
                    year : newYear,
                    actors : newActors

                };

                client.createEntity(properties, function(error, result){
		            if (error) {
		    	        res.jsonp(500, {
		    	        	'error' : JSON.stringify(err)
		    	        });
	    	        }
	    	        else {
		                res.jsonp(result);
	    	        }
    	        });
            }
		}
    }



})

/**
 *
 * Delete a movie
 *
*/
app.delete('/movie_delete', function(req, res) {

    if (req.param('udid') === undefined) {
        res.jsonp(500, {
			'error' : "No udid was provided. You can get the udid of a movie by searching the movie by its name via GET movies_by_name"
		});
    }
    else {

        var properties = {
            client : client,
            data: {
		        'type' : 'movies',
		        'uuid' : req.param('udid')
	        }
        };

        var entity = new usergrid.entity(properties);

        entity.destroy(function(error, result){
		    if (error) {
		        res.jsonp(500, {
		    	    'error' : JSON.stringify(err)
		        });
	        }
	    	else {
		        res.jsonp(result);
	    	}
        });
    }


})

app.listen("tannerjuby-test.apigee.net/assignment4");
console.log("Server running on...")
