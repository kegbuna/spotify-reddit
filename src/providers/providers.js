"use strict";

class Providers {
	constructor(type, provider) {
		return require('./' + type + 's/' + provider);
	}
}

module.exports = Providers;