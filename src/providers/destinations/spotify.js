"use strict"

const SpotifyWebAPI = require('spotify-web-api-node');
const SpotifyConfig = require('../../config/spotify');

let Destination = require('../destination');

let _ = require('lodash');

class Spotify extends Destination {
	constructor() {
		super();
		
		this.api = new SpotifyWebAPI({
			redirectUri: SpotifyConfig.redirectUri,
			clientId: SpotifyConfig.clientId,
			clientSecret: SpotifyConfig.clientSecret
		});
	}

	generateAuth() {
		return this.api.createAuthorizeURL(SpotifyConfig.scopes, 'auth');
	}
	
	validateAuth(code, res) {
		return this.api.authorizationCodeGrant(code).then((data) => {
			this.api.setAccessToken(data.body['access_token']);
    		this.api.setRefreshToken(data.body['refresh_token']);

    		//res.cookie('access_token', data.body['access_token'], {maxAge: 3600});
    		//res.cookie('refresh_token', data.body['refresh_token'], {maxAge: 3600});
    		//TODO: save refresh token to DB
		}, function(err) {
			console.error('An error occurred!', err);
		}).then(() => {
			this.api.getMe().then((data) => {
				//console.log(data);
				this.api.getUserPlaylists(data.body.id).then((data) => {
					//console.log(data);
				});
			});
		});
	}
	
	findGlobalTrack(q) {
		this.api.searchTracks(q).then((data) => {
			console.log(JSON.stringify(data));
		}, function(err) {
			console.error('An error occurred!', err);
		});
	}
}

module.exports = Spotify;