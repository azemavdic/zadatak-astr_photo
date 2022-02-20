import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import { useDispatch, useSelector } from 'react-redux'
import EventComponent from './EventComponent'
import { useState } from 'react'
import sub from 'date-fns/sub'
import Modal from 'react-modal'
import { showModal } from '../features/modalSlice'
import { useSviEventiQuery } from '../features/api'

// KALENDAR
const locales = {
  'en-US': require('date-fns/locale/en-US'),
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

//MODAL
export const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: 999,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgb(128,128,128)',
    zIndex: '999',
  },
}

Modal.setAppElement('#root')

const Kalendar = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [modalData, setModalData] = useState({})

  const dispatch = useDispatch()
  const modalIsOpen = useSelector((state) => state.modal.modal)

  const { data } = useSviEventiQuery()

  //Otvaranje modala i pregled slike sa API-ja
  const handleSelectEvent = async (e) => {
    setIsLoading(true)
    let date
    date = format(new Date(e.start), 'yyyy-MM-dd')
    const currentDate = format(new Date(), 'yyyy-MM-dd')
    if (date > currentDate) {
      const oduzetaGodina = sub(e.start, { years: 1 })
      date = format(oduzetaGodina, 'yyyy-MM-dd')
    } else {
      date = format(new Date(e.start), 'yyyy-MM-dd')
    }
    dispatch(showModal(true))
    try {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=2GGURFTotwjhoP8PO7ZQ1cCHLA8f7EkPqix4kdMY&date=${date}`
      )

      const data = await res.json()
      setModalData(data)
      if (!res.ok) {
        console.log(res.message)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  return (
    <div className='mb-8 bg-gray-100'>
      <Calendar
        onSelectEvent={handleSelectEvent}
        defaultView='month'
        localizer={localizer}
        events={data?.events}
        views={['month']}
        startAccessor='start'
        endAccessor='end'
        components={{
          event: EventComponent,
        }}
        style={{ height: 650, zIndex: '-1' }}
      />
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='relative h-96 lg:h-auto'>
          <div className='flex flex-col items-center justify-center'>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <button
                  onClick={() => dispatch(showModal(false))}
                  className='absolute btn btn-xs top-1 right-1'
                >
                  x
                </button>
                <h2 className='mb-2 text-3xl font-bold'>{modalData.title}</h2>
                {modalData.media_type === 'image' ? (
                  <img
                    src={modalData.url}
                    alt=''
                    className='w-2/3 lg:w-1/3 aspect-square'
                  />
                ) : (
                  <iframe
                    src={modalData.url}
                    title={modalData.title}
                    className='w-2/3 h-80 aspect-video'
                  />
                )}
                <p className='mt-2 text-sm italic'>{modalData.explanation}</p>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Kalendar
