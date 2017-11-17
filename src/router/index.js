import App from '../App'

export default [{
  path: '/',
  component: App,
  children: [{
    path: '',
    component: r => require.ensure([], () => r(require('../components/home/index')), 'index')
  }, {
    path: '/login',
    component: r => require.ensure([], () => r(require('../components/admin/login')), 'login')
  }, {
    path: '/admin',
    component: r => require.ensure([], () => r(require('../components/admin/index')), 'admin')
  }]
}]
