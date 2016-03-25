"use strict";

class Helpers {
	static parseArtistTitle(str) {
		let re = /(?:\[.*\])?(.*)-(.*)(?:\(.*\))?/g;
		let m;

		while ((m = re.exec(str)) !== null) {
		    if (m.index === re.lastIndex) {
		        re.lastIndex++;
		    }
		}

		console.log(m);
	}
}

module.exports = Helpers;