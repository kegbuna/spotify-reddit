"use strict";

let _ = require('lodash');

let express = require('express');

let Salts = require('./config/salts');

let Destination = require('./providers/destination');

const app = express();
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.use(require('express-promise')());
app.use(require('cookie-parser')(Salts.cookies));
app.use(function(req, res, next) {
	req.destination = new Destination('Spotify', req);
	next();
});

app.get('/', function(req, res) {
	let authenticated = (_.has(req.cookies, 'access_token') && _.has(req.cookies, 'refresh_token'));

	res.render('index', {
		authenticated: authenticated,
		currentUser: req.destination.currentUser
	});
});

app.get('/spotify/global/track', function(req, res) {
	if(_.has(req.query, 'track')) {
		let track = Spotify.global.track(req.query.track);
	} else {
		console.error('No track provided to spotify/global/track');
	}
});

app.get('/spotify/auth/generate', function(req, res) {
	let url = Spotify.auth.generate();

	if(url) res.end(url);
});

app.get('/spotify/auth/callback', function(req, res) {
	Spotify.auth.validate(req.query.code, res).then(function(data) {
		res.render('spotify/auth/callback');
	}, function (err) {
		//placeholder for rendering an error view or the like
		res.send(err);
	});

});

app.listen(5000);