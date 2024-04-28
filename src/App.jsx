import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

//pages
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'

//css
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<h1>{<RegisterPage />}</h1>}></Route>
    </Routes>
  )
}

export default App
