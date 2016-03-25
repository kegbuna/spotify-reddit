"use strict";

let Provider = require('./provider');

let _ = require('lodash');

class Source extends Provider {
	constructor(provider, req) {
		provider = provider || null;

		if(provider) {
			super('sources', provider, req);
		} else {
			super();
		}

		_.bindAll(this, ['_getAllPosts']);

		this.posts = {
			all: this._getAllPosts
		}
	}

	_getAllPosts() {
		return this.interface.getAllPosts.apply(this.interface, arguments);
	}
}

module.exports = Source;