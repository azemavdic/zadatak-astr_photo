import { useNavigate } from 'react-router-dom'

const Forma = () => {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/kalendar')
  }
  return (
    <div className='h-screen font-sans bg-cover form-bg'>
      <div className='container flex items-center justify-center flex-1 h-full mx-auto'>
        <div className='w-full max-w-lg'>
          <div className='leading-loose'>
            <form
              onSubmit={handleSubmit}
              className='max-w-sm p-10 m-4 bg-white bg-opacity-25 rounded shadow-xl'
            >
              <p className='text-lg font-medium text-center text-white'>
                ISPUNITE FORMU
              </p>

              <div className='mt-2'>
                <label className='block text-sm text-white' htmlFor='ime'>
                  Ime
                </label>
                <input
                  className='w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white'
                  type='text'
                  id='ime'
                  placeholder='Upišite ime'
                  required
                />
              </div>
              <div className='mt-2'>
                <label className='block text-sm text-white'>Slika</label>
                <input
                  className='w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white'
                  type='url'
                  id='slika'
                  name='slika'
                  placeholder='Upišite url profilne slike'
                  required
                />
              </div>

              <div className='mt-2'>
                <label className='block text-sm text-white'>Email</label>
                <input
                  className='w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white'
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Upišite email'
                  required
                />
              </div>

              <div className='mt-2'>
                <label className='block text-sm text-white'>Rođendan</label>
                <input
                  className='w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white'
                  type='date'
                  id='rodendan'
                  name='rodendan'
                  placeholder='Upišite datum rođendana'
                  required
                />
              </div>

              <div className='mt-2'>
                <label className='block text-sm text-white'>Mobitel</label>
                <input
                  className='w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white'
                  type='tel'
                  id='mobitel'
                  name='mobitel'
                  placeholder='Upišite broj mobitela'
                  required
                />
              </div>

              <div className='flex items-center justify-between mt-4'>
                <button
                  className='px-4 py-1 font-light tracking-wider text-white bg-gray-900 rounded btn-block disabled:loading btn disabled:bg-gray-200 hover:bg-gray-800'
                  type='submit'
                  // disabled={loading}
                >
                  Potvrdi
                </button>
              </div>
              {/* {greska && <span className='text-red-400'>{greska}</span>} */}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forma
