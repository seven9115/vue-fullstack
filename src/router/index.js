import App from '../App'

export default [{
  path: '/',
  component: App,
  children: [{
    path: '',
    component: r => require.ensure([], () => r(require('../pages/home/index')), 'index')
  }, {
    path: '/login',
    component: r => require.ensure([], () => r(require('../pages/admin/login')), 'login')
  }, {
    path: '/admin',
    component: r => require.ensure([], () => r(require('../pages/admin/index')), 'admin')
  }]
},{
  path: "*",
  redirect: "/"
}]
