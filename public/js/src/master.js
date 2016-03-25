"use strict";

let Auth = require('./auth');
let Connector = require('./connector');
let Helpers = require('./helpers');

Helpers.ready(function() {
	window.authenticated = function() {
		//Requests.spotify.global.track('track:To Negate artist:Tigran Hamasyan');
	}
	
	Auth = new Auth();
	Connector = new Connector();
});