let SuperAgent = require('superagent');

class Requests {
	constructor() {
		this.auth = {
			generate: this._generateAuthLink
		}
	}

	_generateAuthLink() {
		SuperAgent.get('/spotify/auth/generate').end(function(err, res) {
			let newWindow = window.open(res.text, 'spotify', 'height=600,width=500');
			if(newWindow.focus) newWindow.focus();
		});
	}
}

module.exports = new Requests();