//@ts-ignore
import React, { useState, useEffect } from "react";

type UserStorageType = {
  children: React.ReactNode;
};

export const INITIAL_STATE = {
  userOn: true,
  toggleUserLog: () => INITIAL_STATE.userOn = !INITIAL_STATE.userOn
}

export const UserContext = React.createContext({
  state: INITIAL_STATE,
});

export const UserStorage = ({ children }: UserStorageType) => {  

  return (
    <UserContext.Provider
      value={{
       state: INITIAL_STATE,
      }}
    >     
      {children}
    </UserContext.Provider>
  );
};
