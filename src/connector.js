"use strict";

let SourceInterface = require('./providers/source');
let DestinationInterface = require('./providers/destination');

let Helpers = require('./helpers');

class Connector {
	constructor(source, destination) {
		if(!(source instanceof SourceInterface) || !(destination instanceof DestinationInterface)) {
			console.error('Source or Destination is not valid in Connector::constructor');
		} else {
			this.source = source;
			this.destination = destination;
		}
	}

	execute() {
		this.source.posts.all((posts) => {
			posts.data.children.forEach((element) => {
				let details = Helpers.parseArtistTitle(element.data.title);
				this.destination.findGlobalTrack('track: ' + details[1] + ' artist:' + details[2]).then();
			});
		});
	}
}

module.exports = Connector;