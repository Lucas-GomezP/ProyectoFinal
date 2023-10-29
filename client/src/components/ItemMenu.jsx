import { Link } from 'react-router-dom'

export const ItemMenu = ({ children, route, icon }) => {
  return (
    <li>
      <Link to={route} className='p-1 flex items-center text-base text-gray-500 font-bold hover:ring-2 hover:ring-purple-500 hover:rounded-md hover:text-purple-500 focus:bg-white focus:text-purple-500 rounded-md focus:shadow-sm'>
        {icon}
        {children}
      </Link>
    </li>
  )
}
