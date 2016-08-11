let Requests = require('./requests');

class Connector {
	constructor() {
		this.element = document.querySelectorAll('[data-connector]')[0];
		
		if(this.element) this.element.addEventListener('click', this.handleClick);
	}

	handleClick() {
		let URL = Requests.connector();
	}
}

module.exports = Connector;