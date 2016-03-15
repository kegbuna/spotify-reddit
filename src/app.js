"use strict"

if(process.argv.length > 2 && typeof process.argv.cron !== 'undefined') {
	var controller = require('./cli');
} else {
	var controller = require('./view');
}

controller();