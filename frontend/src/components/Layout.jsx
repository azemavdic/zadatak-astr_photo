import { menu } from '../data/menu'
import { NavLink } from 'react-router-dom'
import { useSviEventiQuery } from '../features/api'
const Layout = () => {
  const active =
    'bg-slate-500 flex w-full items-center justify-center p-3 text-white transition-all duration-500'

  const { data: korisnici } = useSviEventiQuery()
  return (
    <div className='fixed bottom-0 left-0 z-50 w-full bg-slate-400 lg:hidden'>
      <div className='flex items-center justify-around flex-grow'>
        {menu.map(({ path, Ikona }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              isActive
                ? active
                : 'flex w-full items-center justify-center p-3 transition-all duration-500'
            }
          >
            {path === '/kalendar' ? (
              <div className='indicator'>
                <span class='indicator-item badge badge-secondary'>
                  {korisnici?.events.length}
                </span>
                <Ikona size={35} />
              </div>
            ) : (
              <Ikona size={35} />
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Layout
