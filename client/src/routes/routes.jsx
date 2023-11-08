import { createBrowserRouter } from 'react-router-dom'
import { HomeProv } from '../pages/HomeProv'
import { Dashboard } from '../pages/Dashboard'
import { Offer } from '../pages/Offer'
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
  }
])
