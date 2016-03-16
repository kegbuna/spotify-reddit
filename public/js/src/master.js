"use strict"

let Auth = require('./auth');
let Requests = require('./requests');
let Helpers = require('./helpers');

Helpers.ready(function() {
	window.authenticated = function() {
		Requests.spotify.global.track('track:Alright artist:Kendrick Lamar');
	}

	Auth = new Auth();
});