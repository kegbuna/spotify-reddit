"use strict"

const SpotifyWebAPI = require('spotify-web-api-node');
const SpotifyConfig = require('../config/spotify');

class Spotify {
	constructor() {
		this.api = new SpotifyWebAPI({
			redirectUri: SpotifyConfig.redirectUri,
			clientId: SpotifyConfig.clientId,
			clientSecret: SpotifyConfig.clientSecret
		});
	}

	generateAuth() {
		return this.api.createAuthorizeURL(SpotifyConfig.scopes, 'auth');
	}

	findTrack(q) {
		this.api.searchTracks(q).then(function(data) {
			console.log(JSON.stringify(data));
		}, function(err) {
			console.log(err);
		});
	}
}

module.exports = Spotify;