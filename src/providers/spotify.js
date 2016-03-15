"use strict"

const SpotifyWebAPI = require('spotify-web-api-node');
const SpotifyConfig = require('../config/spotify');

class Spotify {
	constructor() {
		this.Auth = {
			generate: this._generateAuth,
			validate: this._validateAuth
		}

		this.Global = {
			track: this._findGlobalTrack
		}

		this.Playlist = {
			track: this._findPlaylistTrack
		}

		this.api = new SpotifyWebAPI({
			redirectUri: SpotifyConfig.redirectUri,
			clientId: SpotifyConfig.clientId,
			clientSecret: SpotifyConfig.clientSecret
		});
	}

	_generateAuth() {
		return this.api.createAuthorizeURL(SpotifyConfig.scopes, 'auth');
	}

	_validateAuth(code) {
		this.api.authorizationCodeGrant(code).then(function(data) {
			this.api.setAccessToken(data.body['access_token']);
    		this.api.setRefreshToken(data.body['refresh_token']);

    		//TODO: save refresh token to DB
		}, function(err) {
			console.error('An error occurred!', err);
		});
	}

	_findGlobalTrack(q) {
		this.api.searchTracks(q).then(function(data) {
			console.log(JSON.stringify(data));
		}, function(err) {
			console.error('An error occurred!', err);
		});
	}
}

module.exports = Spotify;