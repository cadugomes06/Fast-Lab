import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from '../services/firebaseConfig'

export const UserContext = React.createContext({});

type UserStorageType = {
  children: React.ReactNode;
};

export const UserStorage = ({ children }: UserStorageType) => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

    const handleCreateUser = (event: any) => {
        event.preventDefault()
        createUserWithEmailAndPassword(email, password)
        console.log(user, loading, error)
    }   

  return <UserContext.Provider 
            value={{
                handleCreateUser,
                email, setEmail,
                password, setPassword,
            }}>
            {children}
        </UserContext.Provider>;
};
