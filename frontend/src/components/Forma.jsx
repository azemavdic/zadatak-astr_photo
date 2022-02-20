import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useDispatch, useSelector } from 'react-redux'
import { dodajEvent, editujEvent, isEditing } from '../features/eventsSlice'
import { add } from 'date-fns'
import { showModalForma } from '../features/modalSlice'
import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Forma = ({ modalForma, editItem, setEditItem }) => {
  const [rodendan, setRodendan] = useState(null)
  const [formData, setFormData] = useState({
    ime: '',
    slika: '',
    email: '',
  })

  const [mobitel, setMobitel] = useState()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const editMode = useSelector((state) => state.event.editMode)

  //Unos novog korisnika u formu za datum rođenja
  const godina = new Date().getFullYear() - new Date(rodendan).getFullYear()
  const startEnd = add(new Date(rodendan), { years: godina })

  //Edit postojećeg korisnika u formu za datum rođenja
  const godinaEdit =
    new Date().getFullYear() - new Date(editItem.start).getFullYear()
  const startEndEdit = add(new Date(editItem.start), { years: godinaEdit })

  //On change za novog korisnika
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  //On change za edit korisnika
  const handleChangeEdit = (e) => {
    setEditItem((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  //Dodaj novog korisnika
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.email || !formData.ime || !rodendan || !formData.slika) {
      toast.error('Molimo popunite sva polja.')
      return
    }

    if (rodendan > format(new Date(), 'yyyy-MM-dd')) {
      toast.error('Datum rođenja ne može biti veći od današnjeg datuma.')
      return
    }

    formData.mobitel = mobitel

    dispatch(
      dodajEvent({
        id: uuidv4(),
        start: startEnd,
        end: startEnd,
        ime: formData.ime,
        godine: godina,
        email: formData.email,
        thumbnail: formData.slika,
        mobitel: formData.mobitel,
        datumRodjenja: rodendan,
      })
    )
    if (modalForma === 'da') {
      dispatch(showModalForma(false))
      toast.success('Uspješno dodano!')
    } else {
      navigate('/kalendar')
      console.log(startEnd)
    }
  }

  //Edit postojećeg korisnika
  const handleSubmitEdit = (e) => {
    e.preventDefault()

    if (
      !editItem.email ||
      !editItem.ime ||
      !editItem.start ||
      !editItem.thumbnail
    ) {
      toast.error('Molimo popunite sva polja.')
      return
    }

    if (formData.start > format(new Date(), 'yyyy-MM-dd')) {
      toast.error('Datum rođenja ne može biti veći od današnjeg datuma.')
      return
    }

    editItem.mobitel = mobitel

    dispatch(
      editujEvent({
        id: editItem.id,
        start: startEndEdit,
        end: startEndEdit,
        ime: editItem.ime,
        godine: editItem.godina,
        email: editItem.email,
        thumbnail: editItem.thumbnail,
        mobitel: editItem.mobitel,
      })
    )
    if (modalForma === 'da') {
      dispatch(isEditing(false))
      dispatch(showModalForma(false))
      toast.success('Uspješno ispravljeno!')
    } else {
      navigate('/kalendar')
    }
  }

  const handleCloseModal = () => {
    dispatch(showModalForma(false))
    dispatch(isEditing(false))
  }

  return (
    <div className='relative w-full max-w-lg'>
      {modalForma === 'da' && (
        <button
          onClick={handleCloseModal}
          className='absolute btn btn-xs -top-3 right-1'
        >
          x
        </button>
      )}
      <div className='leading-loose'>
        <form
          onSubmit={editMode ? handleSubmitEdit : handleSubmit}
          className='max-w-sm p-10 m-4 bg-white bg-opacity-25 rounded shadow-xl'
        >
          <p className='text-lg font-medium text-center text-white'>
            {editMode ? 'ISPRAVI UNOS' : 'DODAJ KORISNIKA'}
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
              value={editMode ? editItem.ime : formData.ime}
              onChange={editMode ? handleChangeEdit : handleChange}
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
              value={editMode ? editItem.thumbnail : formData.slika}
              onChange={editMode ? handleChangeEdit : handleChange}
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
              value={editMode ? editItem.email : formData.email}
              onChange={editMode ? handleChangeEdit : handleChange}
            />
          </div>

          <div className='mt-2'>
            <label className='block text-sm text-white'>Datum rođenja</label>
            <Datepicker
              className='w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white'
              name='rodendan'
              placeholderText='dan.mjesec.godina'
              selected={editMode ? editItem.datumRodjenja : rodendan}
              onChange={(date) =>
                editMode
                  ? setEditItem((prev) => ({ ...prev, datumRodjenja: date }))
                  : setRodendan(date)
              }
              maxDate={new Date()}
              showYearDropdown
              scrollableYearDropdown
              dateFormat='dd.MM.yyyy'
            />
          </div>

          <div className='mt-2'>
            <label className='block text-sm text-white'>Mobitel</label>
            <PhoneInput
              defaultCountry='BA'
              className='w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white'
              placeholder='Upišite broj mobitela'
              value={editMode ? editItem.mobitel : mobitel}
              onChange={setMobitel}
            />
          </div>

          <div className='flex items-center justify-between mt-4'>
            <button
              className='px-4 py-1 font-light tracking-wider text-white bg-gray-900 rounded btn-block disabled:loading btn disabled:bg-gray-200 hover:bg-gray-800'
              type='submit'
              // disabled={loading}
            >
              {editMode ? 'Edituj' : 'Potvrdi'}
            </button>
          </div>
          {/* {greska && <span className='text-red-400'>{greska}</span>} */}
        </form>
      </div>
    </div>
  )
}

export default Forma
