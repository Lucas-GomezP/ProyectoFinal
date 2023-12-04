import { createBrowserRouter } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Dashboard } from '../pages/Dashboard'
import { Offer } from '../pages/Offer'
import { Clients } from '../pages/Clients'
import { Bills } from '../pages/Bills'
import { Profile } from '../pages/Profile'
import { Landing } from '../pages/Landing'
import { ErrorPage } from '../pages/404'
import { SignIn } from '../pages/SignIn'
import { ApiDoc } from '../pages/ApiDoc'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signIn',
    element: <SignIn />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/offer',
    element: <Offer />
  },
  {
    path: '/clients',
    element: <Clients />
  },
  {
    path: '/bills',
    element: <Bills />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/apidoc',
    element: <ApiDoc />
  },
  {
    path: '*',
    element: <ErrorPage />
  }
])
