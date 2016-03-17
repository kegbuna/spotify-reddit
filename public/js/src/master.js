"use strict";

let Auth = require('./auth');
let Requests = require('./requests');
let Helpers = require('./helpers');

Helpers.ready(function() {
	window.authenticated = function() {
		Requests.spotify.global.track('track:To Negate artist:Tigran Hamasyan');
	}
	
	Auth = new Auth();
});