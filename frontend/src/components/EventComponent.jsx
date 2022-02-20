const EventComponent = ({ event }) => {
  // const godine = () => {
  //   switch (event.godine) {
  //     case 2:
  //       return 'godine'
  //     case 3:
  //       return 'godine'
  //     case 4:
  //       return 'godine'
  //     case 22:
  //       return 'godine'
  //     case 23:
  //       return 'godine'
  //     case 24:
  //       return 'godine'
  //     case 32:
  //       return 'godine'
  //     case 33:
  //       return 'godine'
  //     case 34:
  //       return 'godine'
  //     case 42:
  //       return 'godine'
  //     case 43:
  //       return 'godine'
  //     case 44:
  //       return 'godine'
  //     default:
  //       return 'godina'
  //   }
  // }

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
