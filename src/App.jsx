import { Routes, Route } from 'react-router-dom'

//pages
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
import ListPage from './pages/List'
import HomePage from './pages/Home'
import ViewOrdersPage from './pages/ViewOrders'
import BookDetailsPage from './pages/Details'
import ViewOrderDetails from './pages/ViewOrderDetails'

//components
import MyNavbar from './components/Navbar'

//css
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/book/list" element={<ListPage />}></Route>
        <Route path="/book/view/:bookId" element={<BookDetailsPage />}></Route>
        <Route path="/books/orders" element={<ViewOrdersPage />}></Route>
        <Route path="/books/orders/:bookId" element={<ViewOrderDetails />}
        ></Route>
      </Routes>
    </div>
  )
}

export default App
