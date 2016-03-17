"use strict"

//const RedditAPI = require('redwrap');
//const SpotifyConfig = require('../../config/spotify');

let Source = require('../source');

let _ = require('lodash');

class Reddit extends Source {
	constructor(req) {
		super();

		//this.api = RedditAPI;
	}
}

module.exports = Reddit;