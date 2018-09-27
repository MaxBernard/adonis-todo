'use strict'

// const validator = use('Validator')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route')
const AuthRoutes = use('Auth/Routes')

// Route.on('/').render('home').as('home')
Route.get('/', 'PageController.index');
Route.get('/home', 'PageController.index');
Route.get('/about', 'PageController.about');
Route.get('/services', 'PageController.services');

// Those routes should be only accessible
// when you are not logged in
Route.group(() => {

  // Authentication Routes...
  Route.get('login', 'SessionController.create').as('login')
  // Route.post('login', 'SessionController.store').validator('auth/LoginValidator')
  Route.post('login', 'SessionController.store')

  // Registration Routes...
  Route.get('register', 'UserController.create').as('register')
  Route.post('register', 'UserController.store')

  // Password Reset Routes...
  Route.get('/password/reset', 'ForgotPasswordController.showLinkRequestForm').as('password.request')
  Route.post('/password/email', 'ForgotPasswordController.sendResetLinkEmail').as('password.email').validator('auth/ForgotPasswordValidator')

  Route.post('/password/reset', 'ResetPasswordController.reset').as('password.reset').validator('auth/ResetPasswordValidator')
  Route.get('/password/reset/:token', 'ResetPasswordController.showResetForm').as('password.reset')  
}).middleware(['guest'])

// Those routes should be only accessible
// when you are logged in
Route.group(() => {
  Route.get('logout', 'SessionController.destroy')
  // Projects
  Route.get('projects', 'ProjectController.index')
  Route.get('projects/create', 'ProjectController.create')
  Route.post('projects', 'ProjectController.store')
  Route.get('projects/:id', 'ProjectController.show')
  Route.get('projects/:id/edit', 'ProjectController.edit')
  Route.put('projects/:id', 'ProjectController.update')
  Route.delete('projects/:id/delete', 'ProjectController.destroy')
  // Tasks
  Route.get('projects/:id/tasks', 'TaskController.index')
  Route.post('projects/:id/tasks', 'TaskController.create')
  Route.patch('tasks/:id', 'TaskController.update')
  Route.delete('tasks/:id', 'TaskController.destroy')
}).middleware(['auth'])

