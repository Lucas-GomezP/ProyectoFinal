import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/routes.jsx'
import { UserProvider } from './context/user.jsx'
import { LoginProvider } from './context/isLogin.jsx'
import { Toaster } from 'react-hot-toast'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <LoginProvider>
        <RouterProvider router={routes} />
        <Toaster />
        {/* Se monta el componente en el archivo raiz del proyecto para que las notificaciones que se muestran se visualizen en toda la pagina */}
      </LoginProvider>
    </UserProvider>
  </React.StrictMode>
)
