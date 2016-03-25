"use strict"

let SourceInterface = require('./providers/source');
let DestinationInterface = require('./providers/destination');

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
				//this.destination.findGlobalTrack('track: ')
			});
		});
	}
}

module.exports = Connector;