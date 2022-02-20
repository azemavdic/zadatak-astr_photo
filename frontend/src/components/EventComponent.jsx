import { useSviEventiQuery } from '../features/api'

const EventComponent = ({ event }) => {
  // const { korisnik } = useSviEventiQuery(undefined, {
  //   selectFromResult: ({ data }) => ({
  //     event: data.find((ev) => ev._id === event._id),
  //   }),
  // })

  return (
    <div className='flex items-center space-x-3'>
      <div className='avatar'>
        <div className='w-12 h-12 mask mask-squircle'>
          <img src={event.thumbnail} alt={event.ime} />
        </div>
      </div>
      <div>
        <p>{event.ime}</p>
        <p className='text-sm opacity-50'>{event.godine} god.</p>
        <p className='text-xs opacity-50'>{event.email}</p>
      </div>
    </div>
  )
}

export default EventComponent
