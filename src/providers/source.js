"use strict";

class Source {
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