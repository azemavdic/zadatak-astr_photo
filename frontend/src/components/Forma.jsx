import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useDispatch } from 'react-redux'
import { dodajEvent } from '../features/eventsSlice'
import { add } from 'date-fns'
import { showModalForma } from '../features/modalSlice'
import { format } from 'date-fns'

const Forma = ({ modalForma }) => {
  const [formData, setFormData] = useState({
    ime: '',
    slika: 'https://i.pravatar.cc/300',
    email: '',
    rodendan: '',
  })

  const [mobitel, setMobitel] = useState()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const godina =
    new Date().getFullYear() - new Date(formData.rodendan).getFullYear()

  const startEnd = add(new Date(formData.rodendan), { years: godina })

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !formData.email ||
      !formData.ime ||
      !formData.rodendan ||
      !formData.slika
    ) {
      toast.error('Molimo popunite sva polja.')
      return
    }

    if (formData.rodendan > format(new Date(), 'yyyy-MM-dd')) {
      toast.error('Datum rođenja ne može biti veći od današnjeg datuma.')
      return
    }

    formData.mobitel = mobitel

    dispatch(
      dodajEvent({
        start: startEnd,
        end: startEnd,
        ime: formData.ime,
        godine: godina,
        email: formData.email,
        thumbnail: formData.slika,
      })
    )
    if (modalForma === 'da') {
      dispatch(showModalForma(false))
      toast.success('Uspješno dodano!')
    } else {
      navigate('/kalendar')
    }
  }
  return (
    <div className='w-full max-w-lg relative'>
      {modalForma === 'da' && (
        <button
          onClick={() => dispatch(showModalForma(false))}
          className='absolute btn btn-xs -top-3 right-1'
        >
          x
        </button>
      )}
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
            <label className='block text-sm text-white'>Datum rođenja</label>
            <input
              className='w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white'
              type='date'
              id='rodendan'
              name='rodendan'
              placeholder='Upišite datum rođenja'
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
  )
}

export default Forma
