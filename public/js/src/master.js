"use strict"

let Auth = require('./auth');
let Helpers = require('./helpers');

Helpers.ready(function() {
	Auth = new Auth();
});