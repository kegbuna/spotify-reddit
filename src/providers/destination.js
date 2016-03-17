"use strict";

let Provider = require('./provider');

let _ = require('lodash');

class Destination extends Provider {
	constructor(provider, req) {
		provider = provider || null;
		
		if(provider) {
			super('destinations', provider.toLowerCase(), req);
		} else {
			super();
		}
		
		_.bindAll(this, ['_validateAuth', '_generateAuth', '_findGlobalTrack']);
		
		this.auth = {
			generate: this._generateAuth,
			validate: this._validateAuth
		}

		this.global = {
			track: this._findGlobalTrack
		}
	}
	
	_generateAuth() {
		return this.interface.generateAuth.apply(this.interface, arguments);
	}

	_validateAuth() {
		return this.interface.validateAuth.apply(this.interface, arguments);
	}

	_findGlobalTrack() {
		return this.interface.findGlobalTrack.apply(this.interface, arguments);
	}

	get currentUser() {
		return this.interface.currentUser;
	}
}

module.exports = Destination;