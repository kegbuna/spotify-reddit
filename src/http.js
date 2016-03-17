"use strict";

let _ = require('lodash');

let express = require('express');

let Salts = require('./config/salts');

let Destination = require('./providers/destination');
let Source = require('./providers/source');

const app = express();
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.use(require('express-promise')());
app.use(require('cookie-parser')(Salts.cookies));
app.use(function(req, res, next) {
	req.destination = new Destination('Spotify', req);
	req.source = new Source('Reddit', req);
	next();
});

app.get('/', function(req, res) {
	let data = {
		authenticated: (_.has(req.cookies, 'access_token') && _.has(req.cookies, 'refresh_token'))
	}
	if(data.authenticated) data.currentUser = req.destination.currentUser;

	res.render('index', data);
});

app.get('/spotify/auth/generate', function(req, res) {
	let url = req.destination.auth.generate();

	if(url) res.end(url);
});

app.get('/spotify/auth/callback', function(req, res) {
	req.destination.auth.validate(req.query.code, res).then(function(data) {
		res.render('spotify/auth/callback');
	}, function (err) {
		//placeholder for rendering an error view or the like
		res.send(err);
	});

});

app.listen(5000);