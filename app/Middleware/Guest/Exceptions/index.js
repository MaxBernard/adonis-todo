'use strict'

const GE = require('@adonisjs/generic-exceptions')

class AlreadyAuthenticated extends GE.LogicalException {
	static invoke(message) {
		return new this(message || 'This user is already logged in', 401)
	}
}

module.exports = {
	AlreadyAuthenticated
}