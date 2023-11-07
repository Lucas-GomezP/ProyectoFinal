import { useForm } from 'react-hook-form'

export const HomeProv = () => {
  // LLamamos el hook y obtenemos las funcionalidades que necesitamos
  const { register, handleSubmit } = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <>
      <div className='bg-slate-200 h-screen w-screen flex flex-col justify-center items-center'>
        <h1 className='font-bold text-2xl mb-5'>Log in</h1>
        <form onSubmit={onSubmit} className='flex flex-col gap-4'>
          <label htmlFor='username' className='flex flex-col'> Ingrese su nombre de usuario:
            <input
              {...register('username')}
              name='username'
              type='text'
              required placeholder='usuario'
              className='p-2 w-60 rounded-md focus:outline-purple-500'
            />
          </label>
          <label htmlFor='password' className='flex flex-col'> Ingrese su contraseña:
            <input
              {...register('password')}
              name='password'
              type='password'
              required placeholder='contraseña'
              className='p-2 w-60 rounded-md focus:outline-purple-500'
            />
          </label>
          <button type='submit' className='bg-purple-300 rounded-md p-2 font-bold hover:bg-purple-500'>Ingresar</button>
        </form>
      </div>
    </>
  )
}
