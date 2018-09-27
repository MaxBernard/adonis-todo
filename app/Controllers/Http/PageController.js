'use strict'

class PageController {
  index ({ view }) {
    const title = 'Welcome'
    return view.render('pages.home', { title: title })
  }

  about ({ view }) {
    const title = 'About'
    return view.render('pages.about', { title: title })
  }

  services ({ view }) {
    const data = {
      'title':  'Services',
      'services': ['Web Design', 'Programming', 'SEO']
    }
    return view.render('pages.services', { data })
  }
}

module.exports = PageController