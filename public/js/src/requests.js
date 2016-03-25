let SuperAgent = require('superagent');

class Requests {
	constructor() {
		this.auth = {
			generate: this._generateAuthLink
		}

		this.spotify = {
			global: {
				track: this._globalTrack
			}
		}
	}

	_generateAuthLink() {
		SuperAgent.get('/spotify/auth/generate').end(function(err, res) {
			if(err) {
				console.error('Error', err);
			} else {
				let newWindow = window.open(res.text, 'spotify', 'height=600,width=500');
				if(newWindow.focus) newWindow.focus();
			}
		});
	}

	connector() {
		SuperAgent
			.get('/connector/')
			.end(function(err, res) {
				if(err) {
					console.error('Error', err);
				} else {
					console.log(res)
				}
			});
	}
}

module.exports = new Requests();