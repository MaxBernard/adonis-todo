'use strict'
  
const chalk = require('chalk')
const Project = use('App/Models/Project')
const AuthService = use('App/Services/AuthService')

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
  /**
   * Show a list of all projects
   * GET projects
   */
  async index ({ auth, request, response, view }) {
    console.log(chalk.yellow('Projects: '), chalk.white('Index'))
    const user = await auth.getUser()
    //return await user.projects().fetch()
    const projects = await user.projects().fetch()
    return view.render('projects.index', { projects: projects.toJSON() })
  }

  /**
   * Render a form to be used for creating a new project.
   * GET projects/create
   */
  async create ({ view }) {
    console.log(chalk.yellow('Projects: '), chalk.white('Create'))
    return view.render('projects.create')
  }

  /**
   * Create/save a new project.
   * POST projects
   */
  async store ({ auth, params, request, response }) {
    const user = await auth.getUser()
    const { title, body } = request.all()
    console.log(chalk.yellow('Projects_Store: '), chalk.white(title, body))
    const project = new Project
    project.fill({ title, description: body })
    await user.projects().save( project )
    //return project

    return response.redirect('/projects')
  }

  /**
   * Display a single project.
   * GET projects/:id
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing project.
   * GET projects/:id/edit
   */
  async edit ({ params, view }) {
    const id = params.id
    console.log(chalk.yellow('Projects_Edit: '), chalk.white(id))
    const project = await Project.findOrFail(params.id)
    return view.render('projects.edit', { project: project.toJSON() })
  }

  /**
   * Update project details.
   * PUT or PATCH projects/:id
   */
  async update ({ auth, params, request, response }) {
    const project = await Project.find(params.id)
    console.log(chalk.yellow('Projects_Update: '), chalk.white(project.id))
    const user = auth.user
    AuthService.verifyPermission(project, user)

    const { title, body, completed } = request.all()
    console.log(chalk.yellow('Projects_Update: '), chalk.white(title,body,completed))
    project.merge({ 
      title: title,
      description: body,
      completed: false
    })
    
    //await project.save()
    await user.projects().save( project )
    return response.redirect('/projects')
}

  /**
   * Delete a project with id.
   * DELETE projects/:id
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ProjectController
