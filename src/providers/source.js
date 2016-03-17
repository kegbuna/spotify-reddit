"use strict";

let Provider = require('./provider');

class Source extends Provider {
	constructor(provider, req) {
		provider = provider || null;
		
		if(provider) {
			super('sources', provider.toLowerCase(), req);
		} else {
			super();
		}
	}
}

module.exports = Source;