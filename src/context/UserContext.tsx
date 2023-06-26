import React from 'react';

export const UserContext = React.createContext({})

type UserStorageType = {
    children: React.ReactNode;
}

export const UserStorage = ({children}: UserStorageType) => {

    return (
        <UserContext.Provider
               value={{}}>
                {children}
        </UserContext.Provider>
    )
}