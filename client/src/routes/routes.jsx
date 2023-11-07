import { createBrowserRouter } from 'react-router-dom'
import { HomeProv } from '../pages/HomoProv'
import { Dashboard } from '../pages/Dashboard'
import { Products } from '../pages/Products'
import { Clients } from '../pages/Clients'
import { Bills } from '../pages/Bills'
import { Profile } from '../pages/Profile'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomeProv />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/products',
    element: <Products />
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
  }
])
