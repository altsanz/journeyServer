var journey = require('journey');	// An only-JSON HTTP request router
var http = require('http');
var fs = require('fs');

var fakeDB = {
	subjects: {}
}; // Where new subjects and data of subjects are temporaly stored

var mainRouter = new(journey.Router)();

mainRouter.map(function () {
	// Default URL
	this.root.bind(function (req, res) { res.send("Welcome to the application!") });

	// GET request on /subjects
	this.get('/subjects').bind(function (req, res) {
		// do something
		console.log('GET /databases/');
		console.log(fakeDB);
	});

	// GET request on specific subject - /subjects/vgi
	this.get(/^databases\/([A-Za-z_]+)$/).bind(function (req, res, id) {
		// id contains 'vgi' part
		console.log('GET /databases/'+id + ' received!');
	});

	// PUT request to add a new subject
	this.put(/^databases\/(A-Za-z_]+)$/).bind(function (req, res, id) {
			// Create an object and store it in fakeDB with id as its name and title attribute.
			fakeDB.subjects = {
				name: 'New subject'
			}

			});
});

http.createServer(function (req, response) {
	var body = "";
	req.addListener('data', function (chunk) { body += chunk });
	req.addListener('end', function () {
		mainRouter.handle(req, body, function(result) {
			response.writeHead(result.status, result.headers);
			response.end(result.body);
		});
	}); 
}).listen(1337, '127.0.0.1');