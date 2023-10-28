import { createBrowserRouter } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Products } from '../pages/Products'
import { Clients } from '../pages/Clients'
import { Bills } from '../pages/Bills'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <h1>Home</h1>
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
  }
])
