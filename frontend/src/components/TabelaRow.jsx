import format from 'date-fns/format'
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useIzbrisiEventMutation } from '../features/api'
import { isEditing } from '../features/eventsSlice'
import { showModalForma } from '../features/modalSlice'
import { useDispatch } from 'react-redux'

const TabelaRow = ({ korisnik, i, setEditItem }) => {
  const dispatch = useDispatch()

  //Izbrisi korisnika iz baze
  const [izbrisiKorisnika] = useIzbrisiEventMutation()

  //Brisanje korisnika / eventa
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
      Swal.fire(`Korisnik je obrisan.`, '', 'success')
      await izbrisiKorisnika({ id }).unwrap()
    } else {
      Swal.fire('Korisnik nije obrisan.', '', 'info')
    }
  }

  //Edit korisnika / eventa klik
  const handleEditClick = () => {
    setEditItem(korisnik)
    dispatch(showModalForma(true))
    dispatch(isEditing(true))
  }

  return (
    <tr key={i} className='border-b-[1px]'>
      <td className='px-4'>{i + 1}</td>
      <td className='px-4'>
        {korisnik && format(new Date(korisnik?.start), 'dd.MM.yyyy')}
      </td>
      <td className=''>
        <img
          src={korisnik?.thumbnail}
          alt={korisnik?.ime}
          className='w-12 rounded-md avatar'
        />
      </td>
      <td className='px-4'>{korisnik?.ime}</td>
      <td className='px-4'>{korisnik?.email}</td>
      <td className='flex items-center justify-center h-full p-4 space-x-2'>
        <button
          className='btn btn-info btn-sm'
          onClick={() => handleEditClick()}
        >
          <BsFillPencilFill />
        </button>
        <button
          className='btn btn-error btn-sm'
          onClick={() => handleDelete(korisnik?._id)}
        >
          <BsFillTrashFill />
        </button>
      </td>
    </tr>
  )
}

export default TabelaRow
