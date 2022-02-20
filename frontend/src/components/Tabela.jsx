import { useSelector, useDispatch } from 'react-redux'

import { showModalForma } from '../features/modalSlice'
import Modal from 'react-modal'
import Forma from './Forma'
import { useState } from 'react'
import { useSviEventiQuery } from '../features/api'
import TabelaRow from './TabelaRow'

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

  const dispatch = useDispatch()
  const modalIsOpen = useSelector((state) => state.modal.modalForma)
  //Get korisnici iz baze
  const { data: korisnici, isLoading: loadingEvents } = useSviEventiQuery()

  return (
    <div className='mb-6 lg:px-10'>
      <div className='flex items-center justify-between'>
        <h2 className='mx-3 mb-3 text-lg font-bold text-center lg:text-2xl'>
          Rođendani u ovoj godini
        </h2>
        {korisnici && korisnici?.events.length > 0 && (
          <button
            className='mx-3 mb-3 btn btn-sm lg:btn-md lg:mx-0'
            onClick={() => dispatch(showModalForma(true))}
          >
            Dodaj
          </button>
        )}
      </div>
      <div className='overflow-x-auto'>
        {loadingEvents && 'Loading...'}
        {korisnici && korisnici?.events.length > 0 ? (
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
              {korisnici &&
                korisnici?.events.map((korisnik, i) => (
                  <TabelaRow
                    key={korisnik._id}
                    korisnik={korisnik}
                    i={i}
                    setEditItem={setEditItem}
                  />
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
