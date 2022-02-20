import { useSelector, useDispatch } from 'react-redux'
import format from 'date-fns/format'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'
import { isEditing, izbrisiEvent } from '../features/eventsSlice'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { showModalForma } from '../features/modalSlice'
import Modal from 'react-modal'
import Forma from './Forma'
import { useState } from 'react'

Modal.setAppElement('#root')

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
    padding: '0px',
  },
}

const Tabela = () => {
  const [editItem, setEditItem] = useState({})

  const korisnici = useSelector((state) => state.event.value)
  const dispatch = useDispatch()
  const modalIsOpen = useSelector((state) => state.modal.modalForma)

  const handleDelete = async (id) => {
    const MySwal = withReactContent(Swal)
    const confirm = await MySwal.fire({
      title: 'Jeste li sigurni?',
      text: 'Želite obrisati korisnika?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Da',
      denyButtonText: 'Ne',
      customClass: { htmlContainer: 'grid-row:1' },
    })
    if (confirm.isConfirmed) {
      Swal.fire('Korisnik obrisan!', '', 'success')
      dispatch(izbrisiEvent(id))
    } else {
      Swal.fire('Korisnik nije obrisan.', '', 'info')
    }
  }

  const handleEdit = (id) => {
    setEditItem(korisnici.find((korisnik) => korisnik.id === id))
    // setEditItemRodendan(ko)
    dispatch(showModalForma(true))
    dispatch(isEditing(true))
  }

  return (
    <div className='mb-6 lg:px-10'>
      <div className='flex items-center justify-between'>
        <h2 className='mx-3 mb-3 text-lg font-bold text-center lg:text-2xl'>
          Rođendani u ovoj godini
        </h2>
        {korisnici.length > 0 && (
          <button
            className='mx-3 mb-3 btn btn-sm lg:btn-md lg:mx-0'
            onClick={() => dispatch(showModalForma(true))}
          >
            Dodaj
          </button>
        )}
      </div>
      <div className='overflow-x-auto'>
        {korisnici.length > 0 ? (
          <table className='w-full'>
            <thead className='border-b-2'>
              <tr>
                <th>RB</th>
                <th>Datum</th>
                <th>Slika</th>
                <th>Ime</th>
                <th>Email</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {korisnici.map((korisnik, i) => (
                <tr key={i} className='border-b-[1px]'>
                  <td className='px-4'>{i + 1}</td>
                  <td className='px-4'>
                    {format(korisnik.start, 'dd.MM.yyyy')}
                  </td>
                  <td className=''>
                    <img
                      src={korisnik.thumbnail}
                      alt={korisnik.ime}
                      className='w-12 rounded-md avatar'
                    />
                  </td>
                  <td className='px-4'>{korisnik.ime}</td>
                  <td className='px-4'>{korisnik.email}</td>
                  <td className='px-4 space-x-2'>
                    <button
                      className='btn btn-info btn-sm'
                      onClick={() => handleEdit(korisnik.id)}
                    >
                      <BsFillPencilFill />
                    </button>
                    <button
                      className='btn btn-error btn-sm'
                      onClick={() => handleDelete(korisnik.id)}
                    >
                      <BsFillTrashFill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className='flex flex-col items-center justify-center mb-6'>
            <p className='mb-2 text-center'>Nema korisnika za prikazati</p>
            <button
              className='btn'
              onClick={() => dispatch(showModalForma(true))}
            >
              Dodaj
            </button>
          </div>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <Forma modalForma='da' editItem={editItem} setEditItem={setEditItem} />
      </Modal>
    </div>
  )
}

export default Tabela
