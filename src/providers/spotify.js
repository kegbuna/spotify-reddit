"use strict"

const SpotifyWebAPI = require('spotify-web-api-node');
const SpotifyConfig = require('../config/spotify');

let _ = require('lodash');

class Spotify {
	constructor() {
		_.bindAll(this, ['_validateAuth', '_generateAuth', '_findGlobalTrack']);

		this.auth = {
			validate: this._validateAuth,
			generate: this._generateAuth
		}

		this.global = {
			track: this._findGlobalTrack
		}

		this.playlist = {
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
	
	_validateAuth(code, res) {
		this.api.authorizationCodeGrant(code).then((data) => {
			this.api.setAccessToken(data.body['access_token']);
    		this.api.setRefreshToken(data.body['refresh_token']);

    		res.cookie('access_token', data.body['access_token'], {maxAge: 3600});
    		res.cookie('refresh_token', data.body['refresh_token'], {maxAge: 3600});
    		//TODO: save refresh token to DB
		}, function(err) {
			console.error('An error occurred!', err);
		}).then(() => {
			this.api.getMe().then((data) => {
				//console.log(data);
			});
		});
	}
	
	_findGlobalTrack(q) {
		this.api.searchTracks(q).then((data) => {
			console.log(JSON.stringify(data));
		}, function(err) {
			console.error('An error occurred!', err);
		});
	}
}

module.exports = Spotify;