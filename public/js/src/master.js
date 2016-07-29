"use strict";

const Auth = require('./auth');
const Connector = require('./connector');
const Helpers = require('./helpers');

Helpers.ready(function() {
	window.authenticated = function() {
		//Requests.spotify.global.track('track:To Negate artist:Tigran Hamasyan');
	}
	
	Auth = new Auth();
	Connector = new Connector();
});
