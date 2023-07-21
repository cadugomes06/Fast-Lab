import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Form from './pages/User/Form/Form'
import AdmHome from './pages/Admin/AdmHome';
import UserLogin from './pages/User/Login/UserLogin';
import UserRegister from './pages/User/Login/UserRegister';
import UserCrangePassword from './pages/User/Login/UserChangePassword';
import UserHome from './pages/User/Home/UserHome';
import Termos from './pages/User/Home/Termos';
import FormConfirm from './pages/User/Form/FormConfirm';
import UserRequest from './pages/User/Home/UserRequest';
import AdminLogin from './pages/Admin/AdminLogin';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> } />

        <Route path='/userlogin' element={ <UserLogin /> } />
        <Route path='/userlogin/register' element={ <UserRegister /> } />
        <Route path='/userlogin/changepassword' element={ <UserCrangePassword /> } />

        <Route path='/user/userhome' element={ <UserHome /> } />
        <Route path='user/solicitacao' element={ <Form /> } />
        <Route path='user/termos' element={ <Termos /> } />
        <Route path='user/feedback' element={ <FormConfirm /> } />
        <Route path='user/consulta' element={ <UserRequest /> } />


        <Route path='admin/login' element={ <AdminLogin /> } />
        <Route path='admin/home' element={ <AdmHome /> } />

      </Routes>    
    </BrowserRouter>
      
  )
}

export default App