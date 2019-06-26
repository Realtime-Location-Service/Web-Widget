import Login from '../components/Login'
import UserList from '../components/users/UserList.vue'
import UsersHeatMap from '../components/maps/UsersHeatMap.vue'
import Navbar from '../components/partials/Navbar.vue'
import Sidebar from '../components/partials/Sidebar.vue'
import NotFound from '../components/404.vue'

const routes = [
  {
    path: '*',
    name: '404',
    components: {
      unauthorised: NotFound,
      navbar: Navbar
    },
    meta: {
      title: '404 Not Found | Location API',
      basic: true
    }
  },
  {
    path: '/',
    name: 'Login',
    components: {
      unauthorised: Login,
      navbar: Navbar
    },
    meta: {
      title: 'Login | Location API',
      guest: true
    }
  },
  {
    path: '/user-list',
    name: 'UserList',
    components: {
      default: UserList,
      navbar: Navbar,
      sidebar: Sidebar
    },
    meta: {
      title: 'Users | Location API',
      auth: true
    }
  },
  {
    path: '/users-heat-map',
    name: 'UsersHeatMap',
    components: {
      default: UsersHeatMap,
      navbar: Navbar,
      sidebar: Sidebar
    },
    meta: {
      title: 'Heat Map | Location API',
      auth: true
    }
  }
]
export default routes
