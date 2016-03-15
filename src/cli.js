"use strict"

module.exports = function() {
	let Spotify = require('./providers/spotify');
	Spotify = new Spotify();
}