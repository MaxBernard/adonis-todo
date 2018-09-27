'use strict'

const chalk = require('chalk')
const Project = use('App/Models/Project')
const Task = use('App/Models/Task')
const AuthService = use('App/Services/AuthService')

/**
 * Resourceful controller for interacting with tasks
 */
class TaskController {
  /**
   * Show a list of all tasks.
   * GET tasks
   */
  async index ({ auth, params, request, response, view }) {
    const user = await auth.getUser()
    const id = params.id
    const project = await Project.find( id )
    AuthService.verifyPermission(project, user)
    //return await project.tasks().fetch()
    const tasks = await project.tasks().fetch()
    return view.render('tasks.index', { tasks: tasks.toJSON() })
  }

  /**
   * Render a form to be used for creating a new task.
   * GET tasks/create
   */
  async create ({ request, response, view }) {
    return view.render('tasks.create')
  }

  /**
   * Create/save a new task.
   * POST tasks
   */
  async store ({ auth, params, request, response }) {
    const user = await auth.getUser()
    const { title, description } = request.all()
    const id = params.id
    console.log(chalk.yellow('Task_Create: ', id, title, description))
    const project = await Project.find( id )
    AuthService.verifyPermission( project, user )

    const task = new Task
    task.fill({ title, description })
    await project.tasks().save( task )
    //return task
    return response.redirect('back')
  }

  /**
   * Display a single task.
   * GET tasks/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing task.
   * GET tasks/:id/edit
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = TaskController
