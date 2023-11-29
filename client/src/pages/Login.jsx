import { useForm } from 'react-hook-form'
import { API_BASE_URL, ENDPOINTS } from '../routes/apiUrl'
import { useContext } from 'react'
import { UserContext } from '../context/user'
import { Link, Navigate } from 'react-router-dom'
import { IconClose } from '../components/Icons'

export const Login = () => {
  // LLamamos el hook y obtenemos las funcionalidades que necesitamos
  const { register, handleSubmit } = useForm()
  const { user, handleUser } = useContext(UserContext)
  const onSubmit = handleSubmit((data) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(data.username + ':' + data.password)
      }
    }

    fetch(API_BASE_URL + ENDPOINTS.login, requestOptions)
      .then(res => res.json())
      .then(data => {
        localStorage.clear()
        localStorage.setItem('id', data.id)
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.username)
        handleUser()
      })
  })

  return (
    <>
      {user &&
        <Navigate to='/dashboard' replace />}
      <div className='bg-[#A855F7]/90 backdrop-blur-[1px] h-screen w-screen flex flex-col justify-center items-center'>
        <Link to='/'><IconClose className='absolute top-0 right-0 text-white pt-2 pr-2 text-3xl hover:brightness-150' /></Link>
        <div className='flex flex-col justify-center items-center p-[3vw] bg-[#A855F7] border rounded-xl border-opacity-[25] outline-white'>
          <img src='./logo.svg' alt='logo FacturIZI' className='max-h-14 mb-[2vh]' />
          <h1 className='font-bold text-2xl mb-5 text-white'>Log in</h1>
          <form
            onSubmit={onSubmit}
            className='flex flex-col gap-4 '
          >
            <label htmlFor='username' className='flex gap-y-2 flex-col text-white text-center font-medium'> Ingrese su nombre de usuario:
              <input
                {...register('username')}
                id='username'
                type='text'
                required placeholder='usuario'
                className='p-2 w-60 rounded-md focus:outline-purple-500 focus:bg-white bg-gray-300 text-slate-600 placeholder:text-slate-400'
              />
            </label>
            <label htmlFor='password' className='flex flex-col gap-y-2 text-white text-center font-medium'> Ingrese su contraseña:
              <input
                {...register('password')}
                id='password'
                type='password'
                required placeholder='contraseña'
                className='p-2 w-60 rounded-md focus:outline-purple-500 focus:bg-white text-slate-600 placeholder:text-slate-400 bg-gray-300'
              />
            </label>
            <button type='submit' className='w-full bg-purple-300 rounded-md p-2 font-bold hover:bg-purple-700 hover:text-white'>Ingresar</button>
          </form>
        </div>
      </div>
    </>
  )
}
