import Home from '../views/Home/index.jsx'
import UserLogin from '../views/User/Login/index.jsx'
import UserRegister from '../views/User/Register/index.jsx'
import UserProfile from '../views/User/Profile/index.jsx'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/login',
    component: UserLogin
  },
  {
    path: '/register',
    component: UserRegister
  },
  {
    path: '/user/profile',
    component: UserProfile
  }
];

export default routes;