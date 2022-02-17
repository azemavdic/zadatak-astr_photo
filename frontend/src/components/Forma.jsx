import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const Forma = () => {
  const [formData, setFormData] = useState({
    ime: '',
    slika: '',
    email: '',
    rodendan: '',
  })

  const [mobitel, setMobitel] = useState()

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !formData.email ||
      !formData.ime ||
      !formData.slika ||
      !formData.rodendan
    ) {
      toast.error('Molimo popunite sva polja.')
      return
    }

    formData.mobitel = mobitel

    console.log(formData)

    // navigate('/kalendar')
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
                  name='ime'
                  placeholder='Upišite ime'
                  value={formData.ime}
                  onChange={handleChange}
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
                  value={formData.slika}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.rodendan}
                  onChange={handleChange}
                />
              </div>

              <div className='mt-2'>
                <label className='block text-sm text-white'>Mobitel</label>
                <PhoneInput
                  defaultCountry='BA'
                  className='w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white'
                  placeholder='Upišite broj mobitela'
                  value={mobitel}
                  onChange={setMobitel}
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
