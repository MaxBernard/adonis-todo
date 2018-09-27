'use strict'

const chalk = require('chalk')

class SessionController {
  create ({ view }) {
    return view.render('session.create')
  }

  /**
   * Store a session
   */
  async store ({ auth, request, response, session }) {
    const { username, password } = request.all()
    console.log(chalk.yellow('Session_Store: ', username, password))

    try {
      await auth.attempt(username, password)
    } catch (error) {
      session.flashExcept(['password'])
      session.flash( error.message )
      return response.redirect('login')
    }

    return response.redirect('/')
  }

  async destroy ({ auth, response }) {
    await auth.logout()
    return response.redirect('/')
  }
}

module.exports = SessionController
