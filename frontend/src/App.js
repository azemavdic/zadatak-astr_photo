import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from './app/store'
import Home from './pages/Home'
import KalendarPage from './pages/KalendarPage'
import 'react-toastify/dist/ReactToastify.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Layout from './components/Layout'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/kalendar' element={<KalendarPage />} />
        </Routes>
        <ToastContainer />
        <Layout />
      </Router>
    </Provider>
  )
}

export default App
