'use strict'

const Exception = use('./Exceptions')

class Guest {
  async handle({auth, response}, next) {

    try {
      if(auth.user) {
        throw new Exception.AlreadyAuthenticated('Already authenticated', 401)
      }
    } catch (error) {
      throw error
    }
    await next()
  }
}

module.exports = Guest