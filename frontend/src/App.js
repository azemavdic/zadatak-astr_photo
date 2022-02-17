import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Kalendar from './pages/Kalendar'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/kalendar' element={<Kalendar />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App
