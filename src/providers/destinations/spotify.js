"use strict"

const SpotifyWebAPI = require('spotify-web-api-node');
const SpotifyConfig = require('../../config/spotify');

let Destination = require('../destination');

let _ = require('lodash');

class Spotify extends Destination {
	constructor(req) {
		super();

		this.api = new SpotifyWebAPI({
			redirectUri: SpotifyConfig.redirectUri,
			clientId: SpotifyConfig.clientId,
			clientSecret: SpotifyConfig.clientSecret
		});

		if(_.has(req.cookies, 'access_token')) {
			this.api.setAccessToken(req.cookies['access_token']);
		}
	}

	generateAuth() {
		return this.api.createAuthorizeURL(SpotifyConfig.scopes, 'auth');
	}
	
	validateAuth(code, res) {
		return this.api.authorizationCodeGrant(code).then((data) => {
			this.api.setAccessToken(data.body['access_token']);
    		this.api.setRefreshToken(data.body['refresh_token']);

    		let expiresOn = new Date(new Date().getTime() + 3600*1000);
    		res.cookie('access_token', data.body['access_token'], {expires: expiresOn});
    		res.cookie('refresh_token', data.body['refresh_token'], {expires: expiresOn});
    		//TODO: save refresh token to DB
		}, function(err) {
			console.error('An error occurred in validateAuth', err);
		});
	}
	
	findGlobalTrack(q) {
		return this.api.searchTracks(q).then((data) => {
			//console.log(JSON.stringify(data));
		}, function(err) {
			console.error('An error occurred in findGlobalTrack', err);
		});
	}

	get currentUser() {
		return this.api.getMe().then((data) => {
			return data.body;
		});
	}
}

module.exports = Spotify;