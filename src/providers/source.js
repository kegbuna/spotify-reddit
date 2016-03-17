"use strict";

class Source {
	constructor(provider) {
		provider = provider || null;
		
		if(provider) {
			super('sources', provider.toLowerCase());
		} else {
			super();
		}
	}
}

module.exports = Source;