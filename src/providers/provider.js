"use strict";

class Provider {
	constructor(type, name, req) {
		type = type || null;
		name = name || null;

		if(type && name) {
			let api = require('./' + type + '/' + name);
			this.interface = new api(req);
		}	
	}
}

module.exports = Provider;