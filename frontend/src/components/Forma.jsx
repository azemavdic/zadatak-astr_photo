import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useDispatch, useSelector } from 'react-redux'
import { isEditing } from '../features/eventsSlice'
import { add } from 'date-fns'
import { showModalForma } from '../features/modalSlice'
import { format } from 'date-fns'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDodajEventMutation, useEditEventMutation } from '../features/api'
import { AiOutlineUser } from 'react-icons/ai'
import { IoImageOutline } from 'react-icons/io5'
import { HiOutlineMail } from 'react-icons/hi'
import { BsCalendar2Date } from 'react-icons/bs'
import moment from 'moment'

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

  const [dodajEvent, { isLoading: isLoadingDodaj }] = useDodajEventMutation()
  const [updateEvent, { isLoading: isLoadingUpdate }] = useEditEventMutation({
    fixedCacheKey: 'shared-update-post',
  })

  //Dodaj novog korisnika
  const handleSubmit = async (e) => {
    e.preventDefault()

    formData.mobitel = mobitel
    //Validacija forme
    if (
      !formData.email ||
      !formData.ime ||
      !rodendan ||
      !formData.slika ||
      !mobitel
    ) {
      toast.error('Molimo popunite sva polja.')
      return
    }

    if (rodendan > format(new Date(), 'yyyy-MM-dd')) {
      toast.error('Datum rođenja ne može biti veći od današnjeg datuma.')
      return
    }

    // RTK dodavanje u bazu podataka
    dodajEvent({
      start: startEnd,
      end: startEnd,
      ime: formData.ime,
      godine: godina,
      email: formData.email,
      thumbnail: formData.slika,
      mobitel: formData.mobitel,
      rodendan: rodendan,
    })
      .unwrap()
      .then((payload) => {
        toast.success(payload.poruka)
        if (modalForma === 'da') {
          dispatch(showModalForma(false))
        } else {
          navigate('/kalendar')
          dispatch(showModalForma(false))
        }
      })
      .catch((error) => toast.error(error.data.poruka))
  }

  //Edit postojećeg korisnika
  const handleSubmitEdit = async (e) => {
    e.preventDefault()

    const godinaEdit =
      new Date().getFullYear() - new Date(editItem?.rodendan).getFullYear()
    const startEndEdit = add(new Date(editItem?.rodendan), {
      years: godinaEdit,
    })

    if (
      !editItem?.email ||
      !editItem?.ime ||
      !editItem?.start ||
      !editItem?.thumbnail
    ) {
      toast.error('Molimo popunite sva polja.')
      return
    }

    if (formData.start > format(new Date(), 'yyyy-MM-dd')) {
      toast.error('Datum rođenja ne može biti veći od današnjeg datuma.')
      return
    }

    editItem.mobitel = mobitel

    await updateEvent({
      id: editItem?._id,
      start: startEndEdit,
      end: startEndEdit,
      ime: editItem?.ime,
      godine: godinaEdit,
      email: editItem?.email,
      thumbnail: editItem?.thumbnail,
      mobitel: editItem?.mobitel,
      rodendan: editItem?.rodendan,
    })
      .unwrap()
      .then((payload) => {
        toast.success(payload.poruka)
        if (modalForma === 'da') {
          dispatch(showModalForma(false))
          dispatch(isEditing(false))
        } else {
          navigate('/kalendar')
          dispatch(showModalForma(false))
        }
      })
      .catch((error) => toast.error(error.data.poruka))
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
            <div className='flex items-center w-full bg-gray-300 border rounded'>
              <AiOutlineUser size={25} className='mx-3' />
              <input
                className='w-full px-5 py-1 text-gray-700 bg-gray-300 border-none focus:outline-none focus:bg-white'
                type='text'
                name='ime'
                placeholder='Upišite ime'
                value={editMode ? editItem.ime : formData.ime}
                onChange={editMode ? handleChangeEdit : handleChange}
              />
            </div>
          </div>
          <div className='mt-2'>
            <label className='block text-sm text-white'>Slika</label>
            <div className='flex items-center w-full bg-gray-300 border rounded'>
              <IoImageOutline size={25} className='mx-3' />
              <input
                className='w-full px-5 py-1 text-gray-700 bg-gray-300 focus:outline-none focus:bg-white'
                type='url'
                id='slika'
                name='slika'
                placeholder='Upišite url profilne slike'
                value={editMode ? editItem.thumbnail : formData.slika}
                onChange={editMode ? handleChangeEdit : handleChange}
              />
            </div>
          </div>

          <div className='mt-2'>
            <label className='block text-sm text-white'>Email</label>
            <div className='flex items-center w-full bg-gray-300 border rounded'>
              <HiOutlineMail size={25} className='mx-3' />
              <input
                className='w-full px-5 py-1 text-gray-700 bg-gray-300 focus:outline-none focus:bg-white'
                type='email'
                id='email'
                name='email'
                placeholder='Upišite email'
                value={editMode ? editItem.email : formData.email}
                onChange={editMode ? handleChangeEdit : handleChange}
              />
            </div>
          </div>

          <div className='mt-2'>
            <label className='block text-sm text-white'>Datum rođenja</label>
            <div className='flex items-center w-full bg-gray-300 border rounded'>
              <BsCalendar2Date size={25} className='mx-3' />
              <Datepicker
                className='w-full px-5 py-1 text-gray-700 bg-gray-300 focus:outline-none focus:bg-white'
                name='rodendan'
                placeholderText='dan.mjesec.godina'
                selected={
                  editMode ? moment(editItem?.rodendan).toDate() : rodendan
                }
                onChange={(date) =>
                  editMode
                    ? setEditItem((prev) => ({
                        ...prev,
                        rodendan: date,
                        start: date,
                      }))
                    : setRodendan(date)
                }
                maxDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                dateFormat='dd.MM.yyyy'
              />
            </div>
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
              disabled={editMode ? isLoadingUpdate : isLoadingDodaj}
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
