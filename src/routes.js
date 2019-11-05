import App from './App'
import LandingPage from './components/marketing/LandingPage'
import About from './components/marketing/About'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Logout from './components/auth/Logout'


const routes = [
	{ 
		path: '/', 
		component: LandingPage,
		name: 'home'
	},
	{ 
		path: '/todo', 
		component: App,
		name: 'todo',
		meta:{
			requiresAuth: true,
		}
	},
	{ 
		path: '/about', 
		component: About,
		name: 'about'
	},
	{ 
		path: '/login', 
		component: Login,
		name: 'login',
		meta:{
			requiresVisitor: true,
		}
	},
	{ 
		path: '/register', 
		component: Register,
		name: 'register',
		meta:{
			requiresVisitor: true,
		}
	},

	{ 
		path: '/logout', 
		component: Logout,
		name: 'logout'
	},
]

export default routes