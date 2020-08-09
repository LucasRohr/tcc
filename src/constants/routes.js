import { Login, HomeHeir, Begin, HomeOwner, Register } from 'app-pages'

const paths = {
  // Login
  login: () => '/login',

  //Register
  register: () => '/registro',

  //Begin
  begin: () => '/',

  // Homes
  homeOwner: () => '/proprietario',
  homeHeir: () => '/herdeiro',

  //Generic
  reload: () => '/reload',
}

const routes = [
  // Login
  {
    path: paths.login(),
    component: Login,
    isPublic: true,
  },

  //Register
  {
    path: paths.register(),
    component: Register,
    isPublic: true,
  },

  //Begin
  {
    path: paths.begin(),
    component: Begin,
  },

  // Home
  {
    path: paths.homeOwner(),
    component: HomeOwner,
  },

  {
    path: paths.homeHeir(),
    component: HomeHeir,
  },

  // Generic
  {
    path: paths.reload(),
    component: () => null,
  },
]

export { routes, paths }
