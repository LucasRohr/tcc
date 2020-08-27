import { Login, Home, Begin, Register, HeirsManagement, MediasManagement } from 'app-pages'

const paths = {
  // Login
  login: () => '/login',

  //Register
  register: () => '/registro',

  //Begin
  begin: () => '/',

  // Home
  home: () => '/home',

  //Heirs
  heirs: () => '/herdeiros',

  //Medias
  medias: () => '/midias',

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
    path: paths.home(),
    component: Home,
  },

  // Heirs
  {
    path: paths.heirs(),
    component: HeirsManagement,
  },

  // Medias
  {
    path: paths.medias(),
    component: MediasManagement,
  },

  // Generic
  {
    path: paths.reload(),
    component: () => null,
  },
]

export { routes, paths }
