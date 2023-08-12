import { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, Outlet } from 'react-router-dom';



export const ProtectedRoute = () => {

    const { state } = useContext(UserContext)
    const navigate = useNavigate()
    const userStorage = window.localStorage.getItem('user')

    useEffect(() => {
        if (userStorage === null) {
            navigate('/')
        } else { 
           return;
       }
    }, [state.userOn, userStorage])

    return (
        <>
        {userStorage != null ? <Outlet /> : null}
        </>
    )
}

export default ProtectedRoute;