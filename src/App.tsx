import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Form from './pages/User/Form/Form'
import AdminHome from './pages/Admin/AdminHome';
import UserLogin from './pages/User/Login/UserLogin';
import UserRegister from './pages/User/Login/UserRegister';
import UserCrangePassword from './pages/User/Login/UserChangePassword';
import UserHome from './pages/User/Home/UserHome';
import Termos from './pages/User/Home/Termos';
import FormConfirm from './pages/User/Form/FormConfirm';
import UserRequest from './pages/User/Home/UserRequest';
import AdminLogin from './pages/Admin/AdminLogin';
import ProtectedRoute from './routes/ProtectedRoute';
import AllCustumers from './pages/Admin/AllCustumers';
import Contact from './pages/User/Home/Contact';
import TestPage from './pages/TestPage';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/teste' element={ <TestPage /> } />

        <Route path='/userlogin' element={ <UserLogin /> } />
        <Route path='/userlogin/register' element={ <UserRegister /> } />
        <Route path='/userlogin/changepassword' element={ <UserCrangePassword /> } />

       <Route path='/' element={ <ProtectedRoute /> }>
        <Route path='/user/userhome' element={ <UserHome /> } />
        <Route path='user/solicitacao' element={ <Form /> } />
        <Route path='user/termos' element={ <Termos /> } />
        <Route path='user/feedback' element={ <FormConfirm /> } />
        <Route path='user/consulta' element={ <UserRequest /> } />
        <Route path='user/contato' element={ <Contact /> } />
      </Route>

        <Route path='admin/login' element={ <AdminLogin /> } />
        <Route path='admin/home' element={ <AdminHome /> } />
        <Route path='admin/custumers' element={ <AllCustumers /> } />

      </Routes>    
    </BrowserRouter>
      
  )
}

export default App