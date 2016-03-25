"use strict"

const RedditAPI = require('redwrap');
const SpotifyConfig = require('../../config/spotify');

let Source = require('../source');

let _ = require('lodash');

class Reddit extends Source {
	constructor(req) {
		super();

		this.api = RedditAPI;
	}

	getAllPosts(callback) {
		return this.api.r('hiphopheads', function(err, data, res) {
			if(err) {
				console.err(err);
				return;
			}
			callback(data);
		});
	}
}

module.exports = Reddit;