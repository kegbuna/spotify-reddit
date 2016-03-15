let Requests = require('./requests');

class Auth {
	constructor() {
		this.element = document.querySelectorAll('[data-generate-auth]')[0];
		
		this.element.addEventListener('click', this.handleGenerate);
	}

	handleGenerate() {
		let URL = Requests.auth.generate();
	}
}

module.exports = Auth;