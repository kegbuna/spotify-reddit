"use strict";

let _ = require('lodash');

let express = require('express');
let CookieParser = require('cookie-parser');
const app = express();

let Salts = require('./config/salts');

let Destination = require('./providers/destination');
let Spotify = new Destination('Spotify');

app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.use(CookieParser(Salts.cookies));

app.get('/', function(req, res) {
	//console.log(req.cookies['access_token']);
	res.render('index');
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
	Spotify.auth.validate(req.query.code, res).then(function (data) {
		res.render('spotify/auth/callback');
	}, function (err) {
		//placeholder for rendering an error view or the like
		res.send(err);
	});

});

app.listen(5000);