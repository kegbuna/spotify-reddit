"use strict";

let Provider = require('./provider');

let _ = require('lodash');

class Destination extends Provider {
	constructor(provider) {
		provider = provider || null;
		
		if(provider) {
			super('destinations', provider.toLowerCase());
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
		return this.interface.generateAuth.call(this.interface, arguments);
	}

	_validateAuth() {
		return this.interface.validateAuth.call(this.interface, arguments);
	}

	_findGlobalTrack() {
		return this.interface.findGlobalTrack.call(this.interface, arguments);
	}
}

module.exports = Destination;