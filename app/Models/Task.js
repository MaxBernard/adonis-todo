'use strict'

const Model = use('Model')

class Task extends Model {
  // Associate Task with Project
  project() {
    return this.belongsTo('App/Models/Project')
  }
}

module.exports = Task
