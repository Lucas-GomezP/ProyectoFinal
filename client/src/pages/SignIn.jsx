import { useForm } from 'react-hook-form'
import { API_BASE_URL, ENDPOINTS } from '../routes/apiUrl'
import { useContext } from 'react'
import { UserContext } from '../context/user'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { IconClose } from '../components/Icons'
import toast from 'react-hot-toast'

export const SignIn = () => {
  // LLamamos el hook y obtenemos las funcionalidades que necesitamos
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const { user } = useContext(UserContext)
  const onSubmit = handleSubmit((data) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombreusuario: data.username,
        contrasenia: data.password,
        nombre: data.nombre,
        apellido: data.apellido,
        dni: data.dni,
        telefono: data.telefono,
        email: data.email
      })
    }
    try {
      fetch(API_BASE_URL + ENDPOINTS.signIn, requestOptions)
        .then(res => res.json())
        .then(data => {
          console.log('usuario creado', data)
          toast.success('registro exitoso')
          return navigate('/')
        })
    } catch (error) {
      console.error(error)
      toast.error('error')
    }
  })

  return (
    <>
      {user &&
        <Navigate to='/dashboard' replace />}
      <div className='bg-[#A855F7]/90 backdrop-blur-[1px] min-h-screen w-screen flex flex-col justify-center items-center'>
        <Link to='/'><IconClose className='absolute top-0 right-0 text-white pt-2 pr-2 text-3xl hover:brightness-150' /></Link>
        <div className=' flex flex-col justify-center items-center p-[3vw] bg-[#A855F7] border rounded-xl border-opacity-[25] outline-white'>
          <img src='./logo.svg' alt='logo FacturIZI' className='max-h-14 mb-[2vh]' />
          <h1 className='font-bold text-2xl mb-5 text-white'>Registrarse</h1>
          <form
            onSubmit={onSubmit}
            className='grid grid-cols-1 sm:grid-cols-2 gap-4'
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
            <label htmlFor='text' className='flex flex-col gap-y-2 text-white text-center font-medium'> Ingrese su nombre:
              <input
                {...register('nombre')}
                id='nombre'
                type='text'
                required placeholder='nombre'
                className='p-2 w-60 rounded-md focus:outline-purple-500 focus:bg-white text-slate-600 placeholder:text-slate-400 bg-gray-300'
              />
            </label>
            <label htmlFor='text' className='flex flex-col gap-y-2 text-white text-center font-medium'> Ingrese su apellido:
              <input
                {...register('apellido')}
                id='apellido'
                type='text'
                required placeholder='apellido'
                className='p-2 w-60 rounded-md focus:outline-purple-500 focus:bg-white text-slate-600 placeholder:text-slate-400 bg-gray-300'
              />
            </label>
            <label htmlFor='number' className='flex flex-col gap-y-2 text-white text-center font-medium'> Ingrese su DNI:
              <input
                {...register('dni')}
                id='dni'
                type='number'
                required placeholder='11222333'
                className='p-2 w-60 rounded-md focus:outline-purple-500 focus:bg-white text-slate-600 placeholder:text-slate-400 bg-gray-300'
              />
            </label>
            <label htmlFor='number' className='flex flex-col gap-y-2 text-white text-center font-medium'> Ingrese su telefono:
              <input
                {...register('telefono')}
                id='telefono'
                type='number'
                required placeholder='542932111222'
                className='p-2 w-60 rounded-md focus:outline-purple-500 focus:bg-white text-slate-600 placeholder:text-slate-400 bg-gray-300'
              />
            </label>
            <label htmlFor='mail' className='flex flex-col gap-y-2 text-white text-center font-medium'> Ingrese su email:
              <input
                {...register('email')}
                id='mail'
                type='mail'
                required placeholder='pepe@hotmail.com'
                className='p-2 w-60 rounded-md focus:outline-purple-500 focus:bg-white text-slate-600 placeholder:text-slate-400 bg-gray-300'
              />
            </label>
            <button type='submit' className='w-full bg-purple-300 rounded-md p-2 font-bold hover:bg-purple-700 hover:text-white'>Crear</button>
          </form>
        </div>
      </div>
    </>
  )
}
