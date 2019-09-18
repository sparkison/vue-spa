// Landing page/dashboard
const Home = () => import(
  /* webpackChunkName: "home" */
  /* webpackPreload: true  */
  '~/pages/home').then(m => m.default || m)

// User management
const UserIndex = () => import(
  /* webpackChunkName: "userManagement" */
  '~/pages/users').then(m => m.default || m)
const UserListing = () => import(
  /* webpackChunkName: "userManagement" */
  '~/pages/users/listing').then(m => m.default || m)
const UserCrud = () => import(
  /* webpackChunkName: "userManagement" */
  '~/pages/users/crud').then(m => m.default || m)

// Errors
const NotFound = () => import(
  /* webpackChunkName: "error" */
  '~/pages/errors/404').then(m => m.default || m)

// Setup base breadcrumbs
let crumbs = { name: 'Home', routeName: 'home' }

export default [
  // Landing page
  { path: '/', name: 'home', component: Home, meta: { breadcrumbs: [] } },

  // User management
  {
    path: '/users',
    component: UserIndex,
    children: [
      { path: '', redirect: { name: 'user.listing' } },
      {
        path: 'list',
        name: 'user.listing',
        component: UserListing,
        meta: {
          breadcrumbs: [
            crumbs,
            { name: 'Manage Users' }
          ]
        }
      },
      {
        path: 'edit/:id',
        name: 'user.crud',
        component: UserCrud,
        meta: {
          create: true,
          breadcrumbs: [
            crumbs,
            { name: 'Manage Users', routeName: 'user.listing' },
            { name: 'Edit User' }
          ]
        }
      },
      {
        path: 'create',
        name: 'user.create',
        component: UserCrud,
        meta: {
          create: true,
          breadcrumbs: [
            crumbs,
            { name: 'Manage Users', routeName: 'user.listing' },
            { name: 'Create User' }
          ]
        }
      }
    ]
  },

  // Catch-all
  { path: '*', component: NotFound }
]
