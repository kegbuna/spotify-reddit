"use strict"

const Reddit = require('rewrap');
//const SpotifyConfig = require('../../config/spotify');

let Source = require('../source');

let _ = require('lodash');

class Reddit extends Source {
	constructor(req) {
		super();

		this.api = Reddit;
	}
}

module.exports = Reddit;