"use strict"

let express = require('express');
let app = express();
app.set('view engine', 'jade');
app.set('views', './views');

let Spotify = require('./providers/spotify');
Spotify = new Spotify();

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/auth/generate', function(req, res) {
	res.end(Spotify.generateAuth);
});

app.get('/auth/callback', function(req, res) {
  Spotify.findTrack('track:hurt artist:yung lean');
});

app.listen(5000, function() {});