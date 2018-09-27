'use strict'

const Model = use('Model')

class Project extends Model {
  // Associate project with User
  user() {
    return this.belongsTo('App/Models/User')
  }

  // Associate tasks with project
  tasks () {
    return this.hasMany('App/Models/Task')
  }
}

module.exports = Project
