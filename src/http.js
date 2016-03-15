"use strict"

let express = require('express');
const app = express();

let Spotify = require('./providers/spotify');
Spotify = new Spotify();

app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/spotify/auth/generate', function(req, res) {
	let url = Spotify.auth.generate();
	
	if(url) res.end(url);
});

app.get('/spotify/auth/callback', function(req, res) {
	Spotify.auth.validate(req.query.code);
});

app.listen(5000);