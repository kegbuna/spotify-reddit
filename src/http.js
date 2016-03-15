"use strict"

module.exports = function() {
	const express = require('express');
	const app = express();
	app.set('view engine', 'jade');
	app.set('views', './views');
	app.use(express.static('public'));
	
	let Spotify = require('./providers/spotify');
	Spotify = new Spotify();
	
	app.get('/', function(req, res) {
		res.render('index');
	});
	
	app.get('/spotify/auth/generate', function(req, res) {
		let url = Spotify.Auth.generate();
		
		if(url) res.end(Spotify.Auth.generate());
	});
	
	app.get('/spotify/auth/callback', function(req, res) {
		Spotify.Auth.validate(req.query.code);
	});
	
	app.listen(5000);
}