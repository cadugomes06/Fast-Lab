import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Form from './pages/Form/Form'
import AdmHome from './pages/Admin/AdmHome';
import UserLogin from './pages/User/Login/UserLogin';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/userlogin' element={ <UserLogin /> } />
        <Route path='/solicitacao' element={ <Form /> } />
        <Route path='/admhome' element={ <AdmHome /> } />

      </Routes>    
    </BrowserRouter>
      
  )
}

export default App