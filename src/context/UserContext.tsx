//@ts-ignore
import React, { useState, useEffect } from "react";

type UserStorageType = {
  children: React.ReactNode;
};

export const UserContext = React.createContext({});

export const UserStorage = ({ children }: UserStorageType) => {
  const [userAccount, setUserAccount] = useState("");

  return (
    <UserContext.Provider
      value={{
        userAccount,
        setUserAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
