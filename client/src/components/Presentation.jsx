import { PRESENTATION } from '../utils/presentationOfCreators'

export const Presentation = () => {
  return (
    <aside>
      <h2 className='text-xl font-semibold md:text-3xl p-4 text-center '>Creadores</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center'>
        {
        PRESENTATION.map(present => (
          <section key={present.id} className='flex gap-4 flex-col items-center bg-[#f3f4f6] mx-auto h-full p-[1vw] max-w-xs  rounded-3xl border-2'>
            <img src={present.img} alt={present.name} className='max-w-[100px] sm:max-w-[150px] rounded-xl' />
            <section className='text-center'>
              <h3 className='font-semibold text-lg sm:text-xl'>{present.name}</h3>
              <h4 className='sm:text-base'>{present.title}</h4>
              <h5 className='font-medium'>{present.email}</h5>
            </section>
          </section>
        ))
      }
      </div>
    </aside>
  )
}
