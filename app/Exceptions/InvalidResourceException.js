'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InvalidResourceException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(404).json({
      error: 'Invalid resource exception'
    })
  }
}

module.exports = InvalidResourceException
